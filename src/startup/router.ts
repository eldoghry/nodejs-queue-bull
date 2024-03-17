import { Express, Request, Response } from "express";

// routes
const routerSetup = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World!!");
  });
};

export default routerSetup;
