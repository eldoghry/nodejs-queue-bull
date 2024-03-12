import { Express } from "express";

const appSetup = (app: Express) => {
  const APP_PORT = process.env.APP_PORT || 4000;
  app.listen(APP_PORT, () => console.log(`Server started on port ${APP_PORT}`));
};

export default appSetup;
