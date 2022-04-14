import { Request, Response } from "express";
import { Controller } from "./Controller";

export class CheckAddressPostController implements Controller {
  async run(req: Request, res: Response): Promise<void> {
    res.send('OK');
  }
}
