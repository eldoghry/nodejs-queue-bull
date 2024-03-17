import Bull from "bull";
import { emailProcess } from "./email.consumer";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

const emailQueue = new Bull("email", {
  redis: {
    port: 16379, // custom port, default 6379
    host: "127.0.0.1",
  },
});

// Bull DASH
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

//Consumers
emailQueue.process(emailProcess);

// Producers
const sendEmail = async (data: {
  to: string;
  subject: string;
  text: string;
}) => {
  await emailQueue.add(data, {});
  return { status: "success" };
};

export { sendEmail, serverAdapter };
