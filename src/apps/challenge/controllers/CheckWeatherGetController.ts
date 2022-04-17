import { Request, Response } from "express";
import httpStatus from "http-status";

import { Controller } from "./Controller";

export class CheckWeatherGetController implements Controller {
  async run(req: Request, res: Response): Promise<void> {
    res.status(httpStatus.OK).send({
      "weather": "cloudy-night",
      "cloudCover": 9
    });
  }
}
