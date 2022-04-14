import { AddressRepository } from "../domain/AddressRepository"

export class AddressValidator {
  private repository: AddressRepository;

  constructor(repository: AddressRepository) {
    this.repository = repository;
  }

 async run(
  street: string,
  streetNumber: string,
  town: string,
  postalCode: string,
  country: string
 ): Promise<boolean> {
  const address = await this.repository.search(street, streetNumber, town, postalCode, country);
  return address ? true : false;
 }
}
