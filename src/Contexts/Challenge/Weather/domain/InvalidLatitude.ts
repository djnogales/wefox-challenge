export class InvalidLatitude extends Error {
  constructor(latitude: string) {
    super(`The latitude ${latitude} is invalid`);
  }
}

