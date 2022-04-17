import { response } from "express";
import { WeatherFinder } from "../../../../src/Contexts/Challenge/Weather/application/WeatherFinder";
import { WeatherRepository } from "../../../../src/Contexts/Challenge/Weather/domain/WeatherRepository";
import { WeatherMother } from "../domain/WeatherMother";
import { WeatherRepositoryMock } from "../__mocks__/WeatherRepositoryMock";

let repository: WeatherRepositoryMock;
let finder: WeatherFinder;

beforeEach(() => {
  repository = new WeatherRepositoryMock();
  finder = new WeatherFinder(repository);
});

describe('Weather Finder', () => {
  it('should return weather successfully', async() => {
    const weather = WeatherMother.random();

    repository.whenSearchThenReturn(weather);

    const result = await repository.search(weather.latitude, weather.longitude);

    repository.assertLastSearchedUserIs(weather.latitude, weather.longitude);
    expect(result.toPrimitives()).toStrictEqual(weather.toPrimitives());
  });
});
