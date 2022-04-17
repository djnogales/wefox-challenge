export class UserAlreadyExists extends Error {
  constructor(email: string) {
    super(`User ${email} already exists`);
  }
}
