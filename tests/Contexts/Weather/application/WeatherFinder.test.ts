import { WeatherFinder } from "../../../../src/Contexts/Challenge/Weather/application/WeatherFinder";
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

    const result = await finder.run(weather.latitude.value, weather.longitude.value);

    repository.assertLastSearchedUserIs(weather.latitude, weather.longitude);
    expect(result.toPrimitives()).toStrictEqual(weather.toPrimitives());
  });
});
