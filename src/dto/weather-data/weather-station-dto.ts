import { ReadingDto } from "./reading-dto";

export class WeatherStationDto {

    private weatherStationId: number;
    private weatherStationName: string;
    private reading: ReadingDto;

    public getWeatherStationId(): number {
        return this.weatherStationId;
    }

    public setWeatherStationId(weatherStationId: number): void {
        this.weatherStationId = weatherStationId;
    }

    public getWeatherStationName(): string {
        return this.weatherStationName;
    }

    public setWeatherStationName(weatherStationName: string): void {
        this.weatherStationName = weatherStationName;
    }

    public getReading(): ReadingDto {
        return this.reading;
    }

    public setReading(reading: ReadingDto): void {
        this.reading = reading;
    }
  
}
  