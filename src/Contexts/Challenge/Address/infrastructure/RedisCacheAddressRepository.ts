import { Nullable } from "../../../Shared/domain/Nullable";
import { RedisClient } from "../../../Shared/infrastructure/RedisClientType";
import { Address } from "../domain/Address";
import { AddressRepository } from "../domain/AddressRepository";

export class RedisCacheAddressRepository implements AddressRepository {
  private repository: AddressRepository;

  constructor(repository: AddressRepository, private client: Promise<RedisClient>) {
    this.repository = repository;
  }
  async search(street: string, streetNumber: string, town: string, postalCode: string, country: string): Promise<Nullable<Address>> {
    const cachedAddress = await (await this.client).get(`address:${JSON.stringify({ street, streetNumber, town, postalCode, country })}`);
    if (cachedAddress !== null) {
      const addressPlain = JSON.parse(cachedAddress);
      return addressPlain !== {} ?
        new Address(addressPlain.street, addressPlain.streetNumber, addressPlain.town, addressPlain.postalCode, addressPlain.country)
        : null;
    } else {
      const address = await this.repository.search(street, streetNumber, town, postalCode, country);
      await (await this.client).set(`address:${JSON.stringify({ street, streetNumber, town, postalCode, country })}`,
        address !== null ? JSON.stringify((address as Address).toPrimitives()) : JSON.stringify({})
      );
      return address;
    }
  }

}
