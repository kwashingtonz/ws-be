import { DistrictDto } from "./district-dto";

export class CountryDto {

    private countryId: number;
    private countryName: string;
    private districts: DistrictDto[];  

    public getCountryId(): number {
        return this.countryId;
    }

    public setCountryId(countryId: number): void {
        this.countryId = countryId;
    }

    public getCountryName(): string {
        return this.countryName;
    }

    public setCountryName(countryName: string): void {
        this.countryName = countryName;
    }

    public getDistricts(): DistrictDto[] {
        return this.districts;
    }

    public setDistricts(districts: DistrictDto[]): void {
        this.districts = districts;
    }

  }
  