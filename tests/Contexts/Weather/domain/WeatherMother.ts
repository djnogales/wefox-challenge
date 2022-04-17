import { Weather } from "../../../../src/Contexts/Challenge/Weather/domain/Weather";
import { WeatherLatitude } from "../../../../src/Contexts/Challenge/Weather/domain/WeatherLatitude";
import { WeatherLongitude } from "../../../../src/Contexts/Challenge/Weather/domain/WeatherLongitude";

export class WeatherMother {
  static random(): Weather {
    return new Weather(
      new WeatherLatitude((Math.random() * (90.0 + 90.0) - 90.0).toString()),
      new WeatherLongitude((Math.random() * (180.0 + 180.0) - 180.0).toString()),
      Math.random() * (10 - 1) + 1,
      'cloudy-night'
    )
  }
}
