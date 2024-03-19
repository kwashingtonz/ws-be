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
exports.SetupServiceImpl = void 0;
const common_response_1 = require("../../../common/dto/common-response");
const database_configuration_1 = require("../../../configuration/database-configuration");
const setup_dao_impl_1 = require("../../../dao/impl/setup-dao-impl");
const country_entity_1 = require("../../../entity/country-entity");
const district_entity_1 = require("../../../entity/district-entity");
const weather_station_entity_1 = require("../../../entity/weather-station-entity");
class SetupServiceImpl {
    constructor() {
        this.setupDao = new setup_dao_impl_1.SetupDaoImpl();
    }
    initialSetup() {
        return __awaiter(this, void 0, void 0, function* () {
            let cr = new common_response_1.CommonResponse();
            try {
                yield database_configuration_1.AppDataSource.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    const countryRepo = transaction.getRepository(country_entity_1.CountryEntity);
                    const districtRepo = transaction.getRepository(district_entity_1.DistrictEntity);
                    const wsRepo = transaction.getRepository(weather_station_entity_1.WeatherStationEntity);
                    const country = new country_entity_1.CountryEntity();
                    country.id = 1;
                    country.countryName = "Sri Lanka";
                    let savedCountry = yield this.setupDao.saveCountry(country, countryRepo);
                    const weatherStations = [
                        { id: 1, name: 'Colombo', code: 'lk-co' },
                        { id: 2, name: 'Gampaha', code: 'lk-gq' },
                        { id: 3, name: 'Kalutara', code: 'lk-kt' },
                        { id: 4, name: 'Kandy', code: 'lk-ky' },
                        { id: 5, name: 'Matale', code: 'lk-mt' },
                        { id: 6, name: 'Nuwara Eliya', code: 'lk-nw' },
                        { id: 7, name: 'Galle', code: 'lk-gl' },
                        { id: 8, name: 'Matara', code: 'lk-mh' },
                        { id: 9, name: 'Hambantota', code: 'lk-hb' },
                        { id: 10, name: 'Jaffna', code: 'lk-ja' },
                        { id: 11, name: 'Kilinochchi', code: 'lk-kl' },
                        { id: 12, name: 'Mannar', code: 'lk-mb' },
                        { id: 13, name: 'Vavuniya', code: 'lk-va' },
                        { id: 14, name: 'Mullaitivu', code: 'lk-mp' },
                        { id: 15, name: 'Batticaloa', code: 'lk-bc' },
                        { id: 16, name: 'Ampara', code: 'lk-ap' },
                        { id: 17, name: 'Trincomalee', code: 'lk-tc' },
                        { id: 18, name: 'Kurunegala', code: 'lk-kg' },
                        { id: 19, name: 'Puttalam', code: 'lk-px' },
                        { id: 20, name: 'Anuradhapura', code: 'lk-ad' },
                        { id: 21, name: 'Polonnaruwa', code: 'lk-pr' },
                        { id: 22, name: 'Badulla', code: 'lk-bd' },
                        { id: 23, name: 'Monaragala', code: 'lk-mj' },
                        { id: 24, name: 'Ratnapura', code: 'lk-rn' },
                        { id: 25, name: 'Kegalle', code: 'lk-ke' }
                    ];
                    for (const weatherStation of weatherStations) {
                        const district = new district_entity_1.DistrictEntity();
                        district.id = weatherStation.id;
                        district.districtName = weatherStation.name;
                        district.country = savedCountry;
                        district.districtCode = weatherStation.code;
                        let savedDistrict = yield this.setupDao.saveDistrict(district, districtRepo);
                        const ws = new weather_station_entity_1.WeatherStationEntity();
                        ws.id = weatherStation.id;
                        ws.weatherStationName = weatherStation.name;
                        ws.district = savedDistrict;
                        yield this.setupDao.saveWeatherStation(ws, wsRepo);
                    }
                }));
                cr.setExtra("Inital Setup Success");
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
exports.SetupServiceImpl = SetupServiceImpl;
