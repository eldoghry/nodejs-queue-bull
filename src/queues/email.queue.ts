import Bull from "bull";
import { emailProcess } from "./email.consumer";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";

const emailQueue = new Bull("email", {
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
  },
});

// Bull DASHBOARD UI
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
  await emailQueue.add(data, {
    //attempts: 3,
    // delay: 2000
  });
  return { status: "success" };
};

export { sendEmail, serverAdapter };
