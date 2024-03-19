"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherDataDto = void 0;
class WeatherDataDto {
    fillViaRequest(body) {
        this.countryId = body.countryId;
        this.districtId = body.districtId;
        this.weatherStationId = body.weatherStationId;
        this.dateTime = new Date(body.dateTime);
        this.temperature = body.temperature;
        this.pressure = body.pressure;
        this.humidity = body.humidity;
    }
    fillViaObject(obj) {
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
    getCountryId() {
        return this.countryId;
    }
    setCountryId(countryId) {
        this.countryId = countryId;
    }
    getCountryName() {
        return this.countryName;
    }
    setCountryName(countryName) {
        this.countryName = countryName;
    }
    getDistrictId() {
        return this.districtId;
    }
    setDistrictId(districtId) {
        this.districtId = districtId;
    }
    getDistrictName() {
        return this.districtName;
    }
    setDistrictName(districtName) {
        this.districtName = districtName;
    }
    getWeatherStationId() {
        return this.weatherStationId;
    }
    setWeatherStationId(weatherStationId) {
        this.weatherStationId = weatherStationId;
    }
    getWeatherStationName() {
        return this.weatherStationName;
    }
    setWeatherStationName(weatherStationName) {
        this.weatherStationName = weatherStationName;
    }
    getDateTime() {
        return this.dateTime;
    }
    setDateTime(dateTime) {
        this.dateTime = dateTime;
    }
    getTemperature() {
        return this.temperature;
    }
    setTemperature(temperature) {
        this.temperature = temperature;
    }
    getPressure() {
        return this.pressure;
    }
    setPressure(pressure) {
        this.pressure = pressure;
    }
    getHumidity() {
        return this.humidity;
    }
    setHumidity(humidity) {
        this.humidity = humidity;
    }
}
exports.WeatherDataDto = WeatherDataDto;
