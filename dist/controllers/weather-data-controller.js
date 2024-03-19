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
const common_response_1 = require("../common/dto/common-response");
const weather_data_dto_1 = require("../dto/weather-data/weather-data-dto");
const weather_data_service_impl_1 = require("../services/weather-data/impl/weather-data-service-impl");
let weatherDataService = new weather_data_service_impl_1.WeatherDataServiceImpl();
exports.saveData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = new common_response_1.CommonResponse();
    try {
        let reqDto = new weather_data_dto_1.WeatherDataDto();
        reqDto.fillViaRequest(req.body);
        cr = yield weatherDataService.saveData(reqDto);
        res.send(cr);
    }
    catch (error) {
        cr.setStatus(false);
        cr.setExtra(error);
        next(error);
    }
});
exports.getWeatherData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = new common_response_1.CommonResponse();
    try {
        cr = yield weatherDataService.getWeatherData();
        res.send(cr);
    }
    catch (error) {
        cr.setStatus(false);
        cr.setExtra(error);
        next(error);
    }
});
