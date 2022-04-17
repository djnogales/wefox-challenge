import { InvalidLongitude } from "./InvalidLongitude";

export class WeatherLongitude {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.validateLongitude();
  }

  private validateLongitude(): void {
    if(parseFloat(this.value) > 180 && parseFloat(this.value) < -180) {
      throw new InvalidLongitude(this.value);
    }
  }
}
