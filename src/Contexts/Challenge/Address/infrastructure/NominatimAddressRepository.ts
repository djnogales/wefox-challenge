import { Nullable } from "../../../Shared/domain/Nullable";
import { Address } from "../domain/Address";
import { AddressRepository } from "../domain/AddressRepository";

import axios from 'axios';

export class NominatimAddressRepository implements AddressRepository {

  async search(street: string, streetNumber: string, town: string, postalCode: string, country: string): Promise<Nullable<Address>> {
    const url = 'https://nominatim.openstreetmap.org/search'
    const params = {
      street: `${streetNumber} ${street}`,
      city: town,
      "country": country,
      postalcode: postalCode,
      format: "json",
      limit: 1
    }
    const response = await axios.get(url, { params });

    return (response.data as {}[]).length > 0 ? new Address(
      street, streetNumber, town, postalCode, country
    ) : null;
  }
}
