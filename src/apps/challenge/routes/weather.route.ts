import container from "../dependency-injection";
import { NextFunction, Request, Response, Router } from "express";
import { CheckWeatherGetController } from "../controllers/CheckWeatherGetController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

export const register = (router: Router) => {
  const controller: CheckWeatherGetController = container.get('Apps.challenge.controllers.CheckWeatherGetController');
  const middleware: AuthMiddleware = container.get('Apps.challenge.middlewares.AuthMiddleware');
  router.get('/weather', (req: Request, res: Response, next: NextFunction) => middleware.run(req, res, next), (req: Request, res: Response) => controller.run(req, res));
};
