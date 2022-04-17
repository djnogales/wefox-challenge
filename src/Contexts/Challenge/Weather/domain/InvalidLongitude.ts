export class InvalidLongitude extends Error {
  constructor(longitude: string) {
    super(`The longitude ${longitude} is invalid`);
  }
}

