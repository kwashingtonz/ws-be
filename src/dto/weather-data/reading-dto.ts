export class ReadingDto {

    private dateTime: Date;
    private temperature: number;
    private pressure: number;
    private humidity: number;

    public getDateTime(): Date {
        return this.dateTime;
    }

    public setDateTime(dateTime: Date): void {
        this.dateTime = dateTime;
    }

    public getTemperature(): number {
        return this.temperature;
    }

    public setTemperature(temperature: number): void {
        this.temperature = temperature;
    }

    public getPressure(): number {
        return this.pressure;
    }

    public setPressure(pressure: number): void {
        this.pressure = pressure;
    }

    public getHumidity(): number {
        return this.humidity;
    }

    public setHumidity(humidity: number): void {
        this.humidity = humidity;
    }

  }
  