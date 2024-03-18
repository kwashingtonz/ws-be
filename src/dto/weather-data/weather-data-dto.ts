export class WeatherDataDto {

    private countryId: number;
    private countryName: string;
    private districtId: number;
    private districtName: string;
    private weatherStationId: number;
    private weatherStationName: string;
    private dateTime: Date;
    private temperature: number;
    private pressure: number;
    private humidity: number;

    public fillViaRequest(body:any){
        this.countryId = body.countryId;
        this.districtId = body.districtId;
        this.weatherStationId = body.weatherStationId;
        this.dateTime = new Date(body.dateTime);
        this.temperature = body.temperature;
        this.pressure = body.pressure;
        this.humidity = body.humidity;
    }

    public fillViaObject(obj:any){
        this.countryId = obj.countryId;
        this.countryName = obj.countryName;
        this.districtId = obj.districtId;
        this.districtName = obj.districtName;
        this.weatherStationId = obj.weatherStationId;
        this.weatherStationName = obj.weatherStationName;
        this.dateTime = new Date(obj.dateTime);
        this.temperature = obj.temperature;
        this.pressure = obj.pressure;
        this.humidity = obj.humidity;
    }

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
  