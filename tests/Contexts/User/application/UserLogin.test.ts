import { UserLogin } from "../../../../src/Contexts/Challenge/User/application/UserLogin";
import { User } from "../../../../src/Contexts/Challenge/User/domain/User";
import { UserRepositoryMock } from "../__mocks__/UserRepositoryMock";
import bcrypt from 'bcrypt';
import AuthConfig from "../../../../src/Contexts/Shared/infrastructure/AuthConfig";
import jwt from 'jsonwebtoken';

let repository: UserRepositoryMock;
let login: UserLogin;
let config: AuthConfig;

beforeEach(() => {
  repository = new UserRepositoryMock();
  config = {
    expiresIn: 36000,
    secretKey: "challenge"
  }
  login = new UserLogin(repository, config);
});

describe('UserLogin', () => {
  it('should login successfully', async() => {
    const email = "test@test.com";
    const password = "0000"

    repository.whenSearchThenReturn(
      new User(email, await bcrypt.hash(password, 10))
    );
    const result = await login.run(email, password);

    repository.assertLastSearchedUserIs(email);

    const verification = jwt.verify(result, config.secretKey) as { email: string, exp: number, iat: number };
    expect(verification.email).toBe(email);
  });
});


