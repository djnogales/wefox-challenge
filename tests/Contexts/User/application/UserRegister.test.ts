import { UserRegister } from "../../../../src/Contexts/Challenge/User/application/UserRegister"
import { User } from "../../../../src/Contexts/Challenge/User/domain/User";
import { UserAlreadyExists } from "../../../../src/Contexts/Challenge/User/domain/UserAlreadyExists";
import { UserRepositoryMock } from "../__mocks__/UserRepositoryMock"

let repository: UserRepositoryMock;
let register: UserRegister;


beforeEach(() => {
  repository = new UserRepositoryMock();
  register = new UserRegister(repository);
});

describe('UserRegister', () => {
  it('should create a valid user', async() => {
    const email = "foo@foo.com"
    const password = "0000"

    repository.whenSearchThenReturn(null)
    await register.run(email, password);

    repository.assertLastSavedUserIs(new User(email, password));
  });
})
