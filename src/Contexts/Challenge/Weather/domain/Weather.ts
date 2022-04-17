import { WeatherLatitude } from "./WeatherLatitude";
import { WeatherLongitude } from "./WeatherLongitude";

export class Weather {
  readonly latitude: WeatherLatitude;
  readonly longitude: WeatherLongitude;
  readonly cloudCover: number;
  readonly weather: string;

  constructor(
    latitude: WeatherLatitude,
    longitude: WeatherLongitude,
    cloudCover: number,
    weather: string
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.cloudCover = cloudCover;
    this.weather = weather;
  }

  toPrimitives() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      cloudCover: this.cloudCover,
      weather: this.weather
    }
  }
}
