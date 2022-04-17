export class InvalidUserCredentials extends Error {
  constructor(email: string) {
    super(`The credentials for ${email} are invalid`);
  }
}
