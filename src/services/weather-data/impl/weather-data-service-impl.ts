import { count } from "console";
import { CommonResponse } from "../../../common/dto/common-response";
import { AppDataSource } from "../../../configuration/database-configuration";
import { WeatherDataDaoImpl } from "../../../dao/impl/weather-data-dao-impl";
import WeatherDataDao from "../../../dao/weather-data-dao";
import { CountryDto } from "../../../dto/weather-data/country-dto";
import { DistrictDto } from "../../../dto/weather-data/district-dto";
import { ReadingDto } from "../../../dto/weather-data/reading-dto";
import { WeatherDataDto } from "../../../dto/weather-data/weather-data-dto";
import { WeatherDataResDto } from "../../../dto/weather-data/weather-data-res-dto";
import { WeatherStationDto } from "../../../dto/weather-data/weather-station-dto";
import { CountryEntity } from "../../../entity/country-entity";
import { DistrictEntity } from "../../../entity/district-entity";
import { ReadingEntity } from "../../../entity/reading-entity";
import { WeatherStationEntity } from "../../../entity/weather-station-entity";
import { WeatherDataService } from "../weather-data-service";
import { Server as SocketIOServer } from 'socket.io';

const { getSocketInstance } = require('../../../support/socket-io-instance');

export class WeatherDataServiceImpl implements WeatherDataService {

  weatherDataDao: WeatherDataDao = new WeatherDataDaoImpl();

  async saveData(weatherDataDto: WeatherDataDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {

        await AppDataSource.transaction(async (transaction) => {
            const wsRepo = transaction.getRepository(WeatherStationEntity);
            const readingsRepo = transaction.getRepository(ReadingEntity);

            let weatherStation = await this.weatherDataDao.findWeatherStationByIds(weatherDataDto, wsRepo);

            if(weatherStation){
                let reading = new ReadingEntity();
                reading.weatherStation = weatherStation;
                reading.dateTime = weatherDataDto.getDateTime();
                reading.temperature = weatherDataDto.getTemperature();
                reading.humidity = weatherDataDto.getHumidity();
                reading.airPressure = weatherDataDto.getPressure();
    
                await this.weatherDataDao.saveReading(reading, readingsRepo);
            }else{
                throw new Error("Weather Station Not Found");
            }
        });

        let weatherDataRes: WeatherDataResDto = new WeatherDataResDto();

        this.getWeatherData().then((cr) => {
            if(cr.isStatus()){
                let extra:any = cr.getExtra();

                weatherDataRes.setCountries(extra.countries);
                
                let socket:SocketIOServer = getSocketInstance();
        
                if(socket){
                    socket.emit("weather-data", weatherDataRes);
                    console.log("Weather Data Emitted")
                }
            }else{
                console.log("Error in getting weather data");
            }
        });


        cr.setExtra("Reading Saved Successfully");
        cr.setStatus(true);
    } catch (error) {
        cr.setStatus(false);
        cr.setExtra(error);
        throw error;
    }
    return cr;
  }

  async getWeatherData(): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {

        let weatherDataRes: WeatherDataResDto = new WeatherDataResDto();

        let countries: CountryEntity[] = await this.weatherDataDao.getCountries();
        let countryDtos: CountryDto[] = new Array();

        for (const country of countries) {
            let countryDto: CountryDto = new CountryDto();
            countryDto.setCountryId(country.id);
            countryDto.setCountryName(country.countryName);

            let districts: DistrictEntity[] = await this.weatherDataDao.getDistrictsByCountryId(country.id);
            let districtDtos: DistrictDto[] = new Array();

            for (const district of districts) {
                let districtDto: DistrictDto = new DistrictDto();
                districtDto.setDistrictId(district.id);
                districtDto.setDistrictName(district.districtName);

                let weatherStations: WeatherStationEntity[] = await this.weatherDataDao.getWeatherStationsByCountryIdAndDistrictId(country.id, district.id);
                let weatherStationDtos: WeatherStationDto[] = new Array();

                for (const weatherStation of weatherStations) {
                    let weatherStationDto: WeatherStationDto = new WeatherStationDto();
                    weatherStationDto.setWeatherStationId(weatherStation.id);
                    weatherStationDto.setWeatherStationName(weatherStation.weatherStationName);

                    let latestReading: ReadingEntity = await this.weatherDataDao.getLatestReadingByCountryDistrictAndWeatherStationIds(country.id, district.id, weatherStation.id);

                    let readingDto: ReadingDto = new ReadingDto();
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
    } catch (error) {
        cr.setStatus(false);
        cr.setExtra(error);
        throw error;
    }
    return cr;
  }
}
