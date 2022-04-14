import { Nullable } from "../../../Shared/domain/Nullable";
import { Address } from "./Address";

export interface AddressRepository {
  search(
    street: string,
    streetNumber: string,
    town: string,
    postalCode: string,
    country: string
  ): Promise<Nullable<Address>>;
}
