import { CheckAddressPostController } from "../controllers/CheckAddressPostController";
import container from "../dependency-injection";
import { Express } from "express";

export const register = (app: Express) => {
  const controller: CheckAddressPostController = container.get('Apps.challenge.controllers.CheckAddressPostController');
  app.post('/check-address', controller.run.bind(controller));
};
