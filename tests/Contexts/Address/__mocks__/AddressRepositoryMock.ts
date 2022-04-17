import { Address } from "../../../../src/Contexts/Challenge/Address/domain/Address";
import { AddressRepository } from "../../../../src/Contexts/Challenge/Address/domain/AddressRepository";
import { Nullable } from "../../../../src/Contexts/Shared/domain/Nullable";

export class AddressRepositoryMock implements AddressRepository {
  private mockSearch = jest.fn();


  async search(street: string, streetNumber: string, town: string, postalCode: string, country: string): Promise<Nullable<Address>> {
    return this.mockSearch(street, streetNumber, town, postalCode, country);
  }

  assertLastSearchedAddressIs(street: string, streetNumber: string, town: string, postalCode: string, country: string): void {
    expect(this.mockSearch).toHaveBeenCalledWith(
      street, streetNumber, town, postalCode, country
    );
  }

  whenSearchThenReturn(value: Nullable<Address>): void {
    this.mockSearch.mockReturnValue(value);
  }

}
