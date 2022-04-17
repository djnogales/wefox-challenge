import { Request, Response } from "express";
import httpStatus from "http-status";
import { WeatherFinder } from "../../../Contexts/Challenge/Weather/application/WeatherFinder";
import { InvalidLatitude } from "../../../Contexts/Challenge/Weather/domain/InvalidLatitude";
import { InvalidLongitude } from "../../../Contexts/Challenge/Weather/domain/InvalidLongitude";

import { Controller } from "./Controller";

export class CheckWeatherGetController implements Controller {
  constructor(private finder: WeatherFinder) {
    this.finder = finder;
  }

  async run(req: Request, res: Response): Promise<void> {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;

    try {
      const weather = await this.finder.run(latitude as string, longitude as string);
      res.status(httpStatus.OK).send(weather.toPrimitives());
    } catch (error) {
      if (error instanceof InvalidLatitude || error instanceof InvalidLongitude) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }
  }
}
