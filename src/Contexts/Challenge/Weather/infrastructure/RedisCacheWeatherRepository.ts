import { RedisClient } from "../../../Shared/infrastructure/RedisClientType";
import { Weather } from "../domain/Weather";
import { WeatherLatitude } from "../domain/WeatherLatitude";
import { WeatherLongitude } from "../domain/WeatherLongitude";
import { WeatherRepository } from "../domain/WeatherRepository";

export class RedisCacheWeatherRepository implements WeatherRepository {
  private repository: WeatherRepository;

  constructor(repository: WeatherRepository, private client: Promise<RedisClient>) {
    this.repository = repository;
  }

  async search(latitude: WeatherLatitude, longitude: WeatherLongitude): Promise<Weather> {

    const lat = latitude.value;
    const lon = longitude.value;
    const cachedWeather = await (await this.client).get(`weather:${JSON.stringify({ lat, lon })}`)

    if (cachedWeather !== null) {
      const weatherPlain = JSON.parse(cachedWeather);
      return new Weather(new WeatherLatitude(weatherPlain.latitude), new WeatherLongitude(weatherPlain.longitude), weatherPlain.cloudCover, weatherPlain.weather);
    } else {
      const weather = await this.repository.search(latitude, longitude);
      await (await this.client).set(`weather:${JSON.stringify({ lat, lon })}`, JSON.stringify((weather as Weather).toPrimitives()));
      await (await this.client).expire(`weather:${JSON.stringify({ lat, lon })}`, 43200); // 12 hours cache

      return weather;
    }
  }
}

