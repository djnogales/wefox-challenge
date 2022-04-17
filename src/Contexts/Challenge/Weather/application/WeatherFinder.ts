import { Weather } from "../domain/Weather";
import { WeatherLatitude } from "../domain/WeatherLatitude";
import { WeatherLongitude } from "../domain/WeatherLongitude";
import { WeatherRepository } from "../domain/WeatherRepository";

export class WeatherFinder {
  private repository: WeatherRepository;

  constructor(repository: WeatherRepository) {
    this.repository = repository;
  }

  async run(latitude: string, longitude: string): Promise<Weather> {
    const weather = await this.repository.search(
      new WeatherLatitude(latitude),
      new WeatherLongitude(longitude)
    );

    return weather;
  }
}
