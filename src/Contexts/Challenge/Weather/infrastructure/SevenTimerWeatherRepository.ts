import { Weather } from "../domain/Weather";
import { WeatherLatitude } from "../domain/WeatherLatitude";
import { WeatherLongitude } from "../domain/WeatherLongitude";
import { WeatherRepository } from "../domain/WeatherRepository";

import axios from 'axios';

export class SevenTimerWeatherRepository implements WeatherRepository {

  async search(latitude: WeatherLatitude, longitude: WeatherLongitude): Promise<Weather> {
    const url = 'http://www.7timer.info/bin/api.pl'
    const params = {
      lon: longitude.value,
      lat: latitude.value,
      product: "civil",
      output: "json"
    }
    const response = await axios.get(url, { params });

    return new Weather(latitude, longitude, response.data.dataseries[0]['cloudcover'], response.data.dataseries[0]['weather']);
  }

}
