import container from "../dependency-injection";
import { Request, Response, Router } from "express";
import { CheckWeatherGetController } from "../controllers/CheckWeatherGetController";

export const register = (router: Router) => {
  const controller: CheckWeatherGetController = container.get('Apps.challenge.controllers.CheckWeatherGetController');
  router.get('/weather', (req: Request, res: Response) => controller.run(req, res));
};
