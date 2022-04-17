import { Weather } from "./Weather";
import { WeatherLatitude } from "./WeatherLatitude";
import { WeatherLongitude } from "./WeatherLongitude";

export interface WeatherRepository {
  search(latitude: WeatherLatitude, longitude: WeatherLongitude): Promise<Weather>;
}
