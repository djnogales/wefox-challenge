import { CheckAddressPostController } from "../controllers/CheckAddressPostController";
import container from "../dependency-injection";
import { Request, Response, Router } from "express";

export const register = (router: Router) => {
  const controller: CheckAddressPostController = container.get('Apps.challenge.controllers.CheckAddressPostController');
  router.post('/validate-address', (req: Request, res: Response) => controller.run(req, res));
};
