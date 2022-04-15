import { Request, Response } from "express";
import httpStatus from "http-status";
import { AddressValidator } from "../../../Contexts/Challenge/Address/application/AddressValidator";
import { Controller } from "./Controller";

export class CheckAddressPostController implements Controller {
  constructor(private addressValidator: AddressValidator) {
    this.addressValidator = addressValidator;
  }

  async run(req: Request, res: Response): Promise<void> {
    const { street, streetNumber, town, postalCode, country } = req.body;
    const validated = await this.addressValidator.run(street, streetNumber, town, postalCode, country);

    validated ? res.status(httpStatus.OK).send() : res.status(httpStatus.BAD_REQUEST).send();
  }
}
