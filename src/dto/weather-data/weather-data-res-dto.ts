import { CountryDto } from "./country-dto";

export class WeatherDataResDto {

    private countries: CountryDto[];

    public getCountries(): CountryDto[] {
        return this.countries;
    }

    public setCountries(countries: CountryDto[]): void {
        this.countries = countries;
    }    

  }
  