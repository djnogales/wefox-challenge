import { AddressValidator } from "../../../../src/Contexts/Challenge/Address/application/AddressValidator";
import { Address } from "../../../../src/Contexts/Challenge/Address/domain/Address";
import { AddressRepositoryMock } from "../__mocks__/AddressRepositoryMock";

let repository: AddressRepositoryMock;
let validator: AddressValidator;

beforeEach(() => {
  repository = new AddressRepositoryMock();
  validator = new AddressValidator(repository);
})

describe('AddressValidator', () => {
  it('should return true with a valid address', async() => {
    const street = "Calle de Preciados";
    const streetNumber = "40";
    const town = "Madrid";
    const postalCode = "28013";
    const country = "Spain";
    repository.whenSearchThenReturn(new Address(
      street, streetNumber, town, postalCode, country
    ));
    await validator.run(street, streetNumber, town, postalCode, country);

    repository.assertLastSearchedAddressIs(
      street, streetNumber, town, postalCode, country
    );
  });
});
