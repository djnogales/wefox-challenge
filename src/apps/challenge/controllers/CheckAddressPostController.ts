import { Request, Response } from "express";
import httpStatus from "http-status";
import { Controller } from "./Controller";

export class CheckAddressPostController implements Controller {
  async run(req: Request, res: Response): Promise<void> {
   req.body?.street === "Calle de Preciados" ?
    res.status(httpStatus.OK).send() : res.status(httpStatus.BAD_REQUEST).send();
  }
}
