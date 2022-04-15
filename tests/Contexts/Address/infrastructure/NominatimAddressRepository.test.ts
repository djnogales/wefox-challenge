import { NominatimAddressRepository } from "../../../../src/Contexts/Challenge/Address/infrastructure/NominatimAddressRepository";

describe('NominatimAddressRepository', () => {
  it('should search a course', async () => {
    const repository = new NominatimAddressRepository();
    const street = "Calle Preciados";
    const streetNumber = "40";
    const town = "Madrid";
    const postalCode = "28013";
    const country = "Spain"
    const address = await repository.search(street, streetNumber, town, postalCode, country);
    expect(address).toBeTruthy()
    expect(address?.street).toBe(street);
  });
})

