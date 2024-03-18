import { CommonResponse } from "../../common/dto/common-response";
import { WeatherDataDto } from "../../dto/weather-data/weather-data-dto";

export interface WeatherDataService{
  saveData(weatherDataDto: WeatherDataDto): Promise<CommonResponse>;
  getWeatherData(): Promise<CommonResponse>;
}
