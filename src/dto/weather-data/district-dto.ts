import { WeatherStationDto } from "./weather-station-dto";

export class DistrictDto {

    private districtId: number;
    private districtName: string;
    private districtCode: string;
    private weatherStations: WeatherStationDto[];

    public getDistrictId(): number {
        return this.districtId;
    }

    public setDistrictId(districtId: number): void {
        this.districtId = districtId;
    }

    public getDistrictName(): string {
        return this.districtName;
    }

    public setDistrictName(districtName: string): void {
        this.districtName = districtName;
    }

    public getDistrictCode(): string {
        return this.districtCode;
    }

    public setDistrictCode(districtCode: string): void {
        this.districtCode = districtCode;
    }

    public getWeatherStations(): WeatherStationDto[] {
        return this.weatherStations;
    }

    public setWeatherStations(weatherStations: WeatherStationDto[]): void {
        this.weatherStations = weatherStations;
    }
    
}
  