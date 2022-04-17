import { User } from "../../../../src/Contexts/Challenge/User/domain/User";
import { UserRepository } from "../../../../src/Contexts/Challenge/User/domain/UserRepository";
import { Nullable } from "../../../../src/Contexts/Shared/domain/Nullable";

export class UserRepositoryMock implements UserRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();

  async save(user: User): Promise<void> {

    this.mockSave(user);
  }

  assertLastSavedUserIs(expected: User): void {
    const mock = this.mockSave.mock;
    const lastSavedUser = mock.calls[mock.calls.length - 1][0] as User
    expect(lastSavedUser).toBeInstanceOf(User);
    expect(lastSavedUser.email).toEqual(expected.email);
  }

  async search(email: string): Promise<Nullable<User>> {
    return this.mockSearch(email);
  }

  whenSearchThenReturn(value: Nullable<User>): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedUserIs(expectedEmail: string): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expectedEmail);
  }
}
