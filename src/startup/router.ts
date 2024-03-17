import { Express, Request, Response } from "express";
import { sendEmail, serverAdapter } from "../queues/email.queue";

// routes
const routerSetup = (app: Express) => {
  app.use("/admin/queues", serverAdapter.getRouter());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World!!");
  });

  app.post("/send-email", async (req: Request, res: Response) => {
    const body = req.body;

    const result = await sendEmail({
      to: body.to,
      subject: body.subject,
      text: body.text,
    });

    res.status(200).send(result);
  });
};

export default routerSetup;
