import { Weather } from "../../../../src/Contexts/Challenge/Weather/domain/Weather";
import { WeatherLatitude } from "../../../../src/Contexts/Challenge/Weather/domain/WeatherLatitude";
import { WeatherLongitude } from "../../../../src/Contexts/Challenge/Weather/domain/WeatherLongitude";
import { WeatherRepository } from "../../../../src/Contexts/Challenge/Weather/domain/WeatherRepository";


export class WeatherRepositoryMock implements WeatherRepository {
  private mockSearch = jest.fn();

  async search(latitude: WeatherLatitude, longitude: WeatherLongitude): Promise<Weather> {
    return this.mockSearch(latitude, longitude);
  }

  whenSearchThenReturn(value: Weather): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedUserIs(latitude: WeatherLatitude, longitude: WeatherLongitude): void {
    expect(this.mockSearch).toHaveBeenCalledWith(latitude, longitude);
  }
}

