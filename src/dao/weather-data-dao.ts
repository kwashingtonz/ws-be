import { Repository } from "typeorm";
import { WeatherStationEntity } from "../entity/weather-station-entity";
import { ReadingEntity } from "../entity/reading-entity";
import { WeatherDataDto } from "../dto/weather-data/weather-data-dto";
import { CountryEntity } from "../entity/country-entity";
import { DistrictEntity } from "../entity/district-entity";

export default interface WeatherDataDao {
    findWeatherStationByIds(weatherDataDto: WeatherDataDto,wsRepo:Repository<WeatherStationEntity>):Promise<WeatherStationEntity>;
    saveReading(reading:ReadingEntity,readingsRepo:Repository<ReadingEntity>):Promise<ReadingEntity>;
    getCountries():Promise<CountryEntity[]>;
    getDistrictsByCountryId(countryId:number):Promise<DistrictEntity[]>;
    getWeatherStationsByCountryIdAndDistrictId(countryId:number,districtId:number):Promise<WeatherStationEntity[]>;
    getLatestReadingByCountryDistrictAndWeatherStationIds(countryId:number,districtId:number,weatherStationId:number):Promise<ReadingEntity>;
}