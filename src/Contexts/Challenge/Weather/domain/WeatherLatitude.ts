import { InvalidLatitude } from "./InvalidLatitude";

export class WeatherLatitude {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.validateLatitude();
  }

  private validateLatitude(): void {
    if(parseFloat(this.value) > 90 && parseFloat(this.value) < -90) {
      throw new InvalidLatitude(this.value);
    }
  }
}
