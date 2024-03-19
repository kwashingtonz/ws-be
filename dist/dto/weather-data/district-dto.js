"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictDto = void 0;
class DistrictDto {
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
    getDistrictCode() {
        return this.districtCode;
    }
    setDistrictCode(districtCode) {
        this.districtCode = districtCode;
    }
    getWeatherStations() {
        return this.weatherStations;
    }
    setWeatherStations(weatherStations) {
        this.weatherStations = weatherStations;
    }
}
exports.DistrictDto = DistrictDto;
