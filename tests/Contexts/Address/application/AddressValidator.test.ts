import { AddressValidator } from "../../../../src/Contexts/Challenge/Address/application/AddressValidator";
import { AddressRepository } from "../../../../src/Contexts/Challenge/Address/domain/AddressRepository";


describe('AddressValidator', () => {
  it('should return true with a valid address', async() => {
    const repository: AddressRepository = {
      search: jest.fn().mockReturnValue(true)
    }
    const validator = new AddressValidator(repository);
    const street = "Calle de Preciados";
    const streetNumber = "40";
    const town = "Madrid";
    const postalCode = "28013";
    const country = "Spain";

    await validator.run(street, streetNumber, town, postalCode, country);

    expect(repository.search).toHaveBeenCalledWith(street, streetNumber, town, postalCode, country);
  });
});
