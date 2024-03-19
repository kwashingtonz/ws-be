"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryDto = void 0;
class CountryDto {
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
    getDistricts() {
        return this.districts;
    }
    setDistricts(districts) {
        this.districts = districts;
    }
}
exports.CountryDto = CountryDto;
