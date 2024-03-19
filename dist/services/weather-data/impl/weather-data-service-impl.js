"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherDataServiceImpl = void 0;
const common_response_1 = require("../../../common/dto/common-response");
const database_configuration_1 = require("../../../configuration/database-configuration");
const weather_data_dao_impl_1 = require("../../../dao/impl/weather-data-dao-impl");
const country_dto_1 = require("../../../dto/weather-data/country-dto");
const district_dto_1 = require("../../../dto/weather-data/district-dto");
const reading_dto_1 = require("../../../dto/weather-data/reading-dto");
const weather_data_res_dto_1 = require("../../../dto/weather-data/weather-data-res-dto");
const weather_station_dto_1 = require("../../../dto/weather-data/weather-station-dto");
const reading_entity_1 = require("../../../entity/reading-entity");
const weather_station_entity_1 = require("../../../entity/weather-station-entity");
const { getSocketInstance } = require('../../../support/socket-io-instance');
class WeatherDataServiceImpl {
    constructor() {
        this.weatherDataDao = new weather_data_dao_impl_1.WeatherDataDaoImpl();
    }
    saveData(weatherDataDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let cr = new common_response_1.CommonResponse();
            try {
                yield database_configuration_1.AppDataSource.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    const wsRepo = transaction.getRepository(weather_station_entity_1.WeatherStationEntity);
                    const readingsRepo = transaction.getRepository(reading_entity_1.ReadingEntity);
                    let weatherStation = yield this.weatherDataDao.findWeatherStationByIds(weatherDataDto, wsRepo);
                    if (weatherStation) {
                        let reading = new reading_entity_1.ReadingEntity();
                        reading.weatherStation = weatherStation;
                        reading.dateTime = weatherDataDto.getDateTime();
                        reading.temperature = weatherDataDto.getTemperature();
                        reading.humidity = weatherDataDto.getHumidity();
                        reading.airPressure = weatherDataDto.getPressure();
                        yield this.weatherDataDao.saveReading(reading, readingsRepo);
                    }
                    else {
                        throw new Error("Weather Station Not Found");
                    }
                }));
                let weatherDataRes = new weather_data_res_dto_1.WeatherDataResDto();
                this.getWeatherData().then((cr) => {
                    if (cr.isStatus()) {
                        let extra = cr.getExtra();
                        weatherDataRes.setCountries(extra.countries);
                        let socket = getSocketInstance();
                        if (socket) {
                            socket.emit("weather-data", weatherDataRes);
                            console.log("Weather Data Emitted");
                        }
                    }
                    else {
                        console.log("Error in getting weather data");
                    }
                });
                cr.setExtra("Reading Saved Successfully");
                cr.setStatus(true);
            }
            catch (error) {
                cr.setStatus(false);
                cr.setExtra(error);
                throw error;
            }
            return cr;
        });
    }
    getWeatherData() {
        return __awaiter(this, void 0, void 0, function* () {
            let cr = new common_response_1.CommonResponse();
            try {
                let weatherDataRes = new weather_data_res_dto_1.WeatherDataResDto();
                let countries = yield this.weatherDataDao.getCountries();
                let countryDtos = new Array();
                for (const country of countries) {
                    let countryDto = new country_dto_1.CountryDto();
                    countryDto.setCountryId(country.id);
                    countryDto.setCountryName(country.countryName);
                    let districts = yield this.weatherDataDao.getDistrictsByCountryId(country.id);
                    let districtDtos = new Array();
                    for (const district of districts) {
                        let districtDto = new district_dto_1.DistrictDto();
                        districtDto.setDistrictId(district.id);
                        districtDto.setDistrictName(district.districtName);
                        districtDto.setDistrictCode(district.districtCode);
                        let weatherStations = yield this.weatherDataDao.getWeatherStationsByCountryIdAndDistrictId(country.id, district.id);
                        let weatherStationDtos = new Array();
                        for (const weatherStation of weatherStations) {
                            let weatherStationDto = new weather_station_dto_1.WeatherStationDto();
                            weatherStationDto.setWeatherStationId(weatherStation.id);
                            weatherStationDto.setWeatherStationName(weatherStation.weatherStationName);
                            let latestReading = yield this.weatherDataDao.getLatestReadingByCountryDistrictAndWeatherStationIds(country.id, district.id, weatherStation.id);
                            let readingDto = new reading_dto_1.ReadingDto();
                            readingDto.setDateTime(latestReading.dateTime);
                            readingDto.setTemperature(latestReading.temperature);
                            readingDto.setHumidity(latestReading.humidity);
                            readingDto.setPressure(latestReading.airPressure);
                            weatherStationDto.setReading(readingDto);
                            weatherStationDtos.push(weatherStationDto);
                        }
                        districtDto.setWeatherStations(weatherStationDtos);
                        districtDtos.push(districtDto);
                    }
                    countryDto.setDistricts(districtDtos);
                    countryDtos.push(countryDto);
                }
                weatherDataRes.setCountries(countryDtos);
                cr.setExtra(weatherDataRes);
                cr.setStatus(true);
            }
            catch (error) {
                cr.setStatus(false);
                cr.setExtra(error);
                throw error;
            }
            return cr;
        });
    }
}
exports.WeatherDataServiceImpl = WeatherDataServiceImpl;
