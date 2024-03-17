import { Express } from "express";

const appSetup = async (app: Express) => {
  const APP_PORT = process.env.APP_PORT || 4000;
  app.listen(APP_PORT, () =>
    console.log(`Server started http://localhost:${APP_PORT}`)
  );
};

export default appSetup;
