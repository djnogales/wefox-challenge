import { Request, Response } from "express";
import { UserLogin } from "../../../Contexts/Challenge/User/application/UserLogin";
import { User } from "../../../Contexts/Challenge/User/domain/User";
import AuthConfig from "../../../Contexts/Shared/infrastructure/AuthConfig";
import { Controller } from "./Controller";
import jwt from 'jsonwebtoken';
import { InvalidUserCredentials } from "../../../Contexts/Challenge/User/domain/InvalidUserCredentials";
import httpStatus from "http-status";

export class LoginPostController implements Controller {
  constructor(private login: UserLogin, private config: AuthConfig) {
    this.login = login;
  }

  async run(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const user = await this.login.run(email, password);

      res.status(httpStatus.OK).json({ token: this.createToken(user) });
    } catch (error) {
      if (error instanceof InvalidUserCredentials) {
        res.status(httpStatus.UNAUTHORIZED).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }
  }

  private createToken(user: User) {
    const dataInToken = { email: user.email };
    return jwt.sign(dataInToken, this.config.secretKey, { expiresIn: this.config.expiresIn });
  }
}
