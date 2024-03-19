"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherStationDto = void 0;
class WeatherStationDto {
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
    getReading() {
        return this.reading;
    }
    setReading(reading) {
        this.reading = reading;
    }
}
exports.WeatherStationDto = WeatherStationDto;
