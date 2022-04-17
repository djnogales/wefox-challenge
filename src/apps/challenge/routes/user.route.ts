import container from "../dependency-injection";
import { Request, Response, Router } from "express";
import { RegisterPostController } from "../controllers/RegisterPostController";
import { LoginPostController } from "../controllers/LoginPostController";

export const register = (router: Router) => {
  const registerController: RegisterPostController = container.get('Apps.challenge.controllers.RegisterPostController');
  const loginController: LoginPostController = container.get('Apps.challenge.controllers.LoginPostController');
  router.post('/user/auth', (req: Request, res: Response) => loginController.run(req, res));
  router.post('/user', (req: Request, res: Response) => registerController.run(req, res));
};
