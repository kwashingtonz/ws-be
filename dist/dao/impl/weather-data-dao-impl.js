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
exports.WeatherDataDaoImpl = void 0;
const weather_station_entity_1 = require("../../entity/weather-station-entity");
const reading_entity_1 = require("../../entity/reading-entity");
const database_configuration_1 = require("../../configuration/database-configuration");
const country_entity_1 = require("../../entity/country-entity");
const district_entity_1 = require("../../entity/district-entity");
class WeatherDataDaoImpl {
    findWeatherStationByIds(weatherDataDto, wsRepo) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = wsRepo.createQueryBuilder("ws")
                .leftJoin("ws.district", "d")
                .leftJoin("d.country", "c")
                .where("ws.id = :wsId", { wsId: weatherDataDto.getWeatherStationId() })
                .andWhere("d.id = :dId", { dId: weatherDataDto.getDistrictId() })
                .andWhere("c.id = :cId", { cId: weatherDataDto.getCountryId() });
            let result = query.getOne();
            return result;
        });
    }
    saveReading(reading, readingsRepo) {
        return __awaiter(this, void 0, void 0, function* () {
            let readEnt = yield readingsRepo.save(reading);
            return readEnt;
        });
    }
    getCountries() {
        return __awaiter(this, void 0, void 0, function* () {
            let countryRepo = database_configuration_1.AppDataSource.getRepository(country_entity_1.CountryEntity);
            let result = yield countryRepo.find();
            return result;
        });
    }
    getDistrictsByCountryId(countryId) {
        return __awaiter(this, void 0, void 0, function* () {
            let districtRepo = database_configuration_1.AppDataSource.getRepository(district_entity_1.DistrictEntity);
            let query = districtRepo.createQueryBuilder("d")
                .leftJoin("d.country", "c")
                .where("c.id = :cId", { cId: countryId });
            let result = query.getMany();
            return result;
        });
    }
    getWeatherStationsByCountryIdAndDistrictId(countryId, districtId) {
        return __awaiter(this, void 0, void 0, function* () {
            let wsRepo = database_configuration_1.AppDataSource.getRepository(weather_station_entity_1.WeatherStationEntity);
            let query = wsRepo.createQueryBuilder("ws")
                .leftJoin("ws.district", "d")
                .leftJoin("d.country", "c")
                .where("c.id = :cId", { cId: countryId })
                .andWhere("d.id = :dId", { dId: districtId });
            let result = query.getMany();
            return result;
        });
    }
    getLatestReadingByCountryDistrictAndWeatherStationIds(countryId, districtId, weatherStationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let readingsRepo = database_configuration_1.AppDataSource.getRepository(reading_entity_1.ReadingEntity);
            let query = readingsRepo.createQueryBuilder("r")
                .leftJoin("r.weatherStation", "ws")
                .leftJoin("ws.district", "d")
                .leftJoin("d.country", "c")
                .where("c.id = :cId", { cId: countryId })
                .andWhere("d.id = :dId", { dId: districtId })
                .andWhere("ws.id = :wsId", { wsId: weatherStationId })
                .orderBy("r.dateTime", "DESC");
            let result = query.getOne();
            return result;
        });
    }
}
exports.WeatherDataDaoImpl = WeatherDataDaoImpl;
