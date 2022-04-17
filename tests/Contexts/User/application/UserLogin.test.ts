import { UserLogin } from "../../../../src/Contexts/Challenge/User/application/UserLogin";
import { User } from "../../../../src/Contexts/Challenge/User/domain/User";
import { UserRepositoryMock } from "../__mocks__/UserRepositoryMock";
import bcrypt from 'bcrypt';


let repository: UserRepositoryMock;
let login: UserLogin;

beforeEach(() => {
  repository = new UserRepositoryMock();
  login = new UserLogin(repository);
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

    expect(result.email).toBe(email);
  });
});


