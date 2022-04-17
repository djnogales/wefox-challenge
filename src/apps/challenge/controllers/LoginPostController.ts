import { Request, Response } from "express";
import { UserLogin } from "../../../Contexts/Challenge/User/application/UserLogin";
import { Controller } from "./Controller";
import { InvalidUserCredentials } from "../../../Contexts/Challenge/User/domain/InvalidUserCredentials";
import httpStatus from "http-status";

export class LoginPostController implements Controller {
  constructor(private login: UserLogin) {
    this.login = login;
  }

  async run(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const token = await this.login.run(email, password);
    
      res.status(httpStatus.OK).json({ "token": token });
    } catch (error) {
      if (error instanceof InvalidUserCredentials) {
        res.status(httpStatus.UNAUTHORIZED).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }
  }


}
