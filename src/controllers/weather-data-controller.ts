import express from "express";
import { CommonResponse } from "../common/dto/common-response";
import { WeatherDataDto } from "../dto/weather-data/weather-data-dto";
import { WeatherDataService } from "../services/weather-data/weather-data-service";
import { WeatherDataServiceImpl } from "../services/weather-data/impl/weather-data-service-impl";

let weatherDataService: WeatherDataService = new WeatherDataServiceImpl();

exports.saveData = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
let cr = new CommonResponse();
try {

    let reqDto:WeatherDataDto = new WeatherDataDto()
    reqDto.fillViaRequest(req.body);

    cr = await weatherDataService.saveData(reqDto);

    res.send(cr);
  } catch (error) {
    cr.setStatus(false);
    cr.setExtra(error);
    next(error);
  }
};

exports.getWeatherData = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
let cr = new CommonResponse();
try {

    cr = await weatherDataService.getWeatherData();

    res.send(cr);
  } catch (error) {
    cr.setStatus(false);
    cr.setExtra(error);
    next(error);
  }
};