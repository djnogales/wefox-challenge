import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserRegister } from "../../../Contexts/Challenge/User/application/UserRegister";
import { UserAlreadyExists } from "../../../Contexts/Challenge/User/domain/UserAlreadyExists";
import { Controller } from "./Controller";

export class RegisterPostController implements Controller {
  constructor(private register: UserRegister) {
    this.register = register;
  }

  async run(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      await this.register.run(email, password);
    } catch (error) {
      if (error instanceof UserAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }
    res.status(httpStatus.CREATED).send();
  }
}
