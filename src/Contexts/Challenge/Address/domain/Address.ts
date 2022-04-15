export class Address {
  readonly street: string;
  readonly streetNumber: string;
  readonly town: string;
  readonly postalCode: string;
  readonly country: string;

  constructor(
    street: string,
    streetNumber: string,
    town: string,
    postalCode: string,
    country: string
  ) {
    this.street = street;
    this.streetNumber = streetNumber;
    this.town = town;
    this.postalCode = postalCode;
    this.country = country;
  }

  toPrimitives() {
    return {
      street: this.street,
      streetNumber: this.streetNumber,
      town: this.town,
      postalCode: this.postalCode,
      country: this.country
    }
  }
}
