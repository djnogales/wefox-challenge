
export class User {
  readonly email: string;
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  toPrimitives() {
    return {
      email: this.email,
      password: this.password
    }
  }

  passwordMatches(password: string) {
    return this.password === password;
  }
}

