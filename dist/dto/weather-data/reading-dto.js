"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingDto = void 0;
class ReadingDto {
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
exports.ReadingDto = ReadingDto;
