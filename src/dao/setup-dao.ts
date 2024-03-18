import { Repository } from "typeorm";
import { CountryEntity } from "../entity/country-entity";
import { DistrictEntity } from "../entity/district-entity";
import { WeatherStationEntity } from "../entity/weather-station-entity";

export default interface SetupDao {
    saveCountry(country:CountryEntity,countryRepo:Repository<CountryEntity>):Promise<CountryEntity>;
    saveDistrict(district:DistrictEntity,districtRepo:Repository<DistrictEntity>):Promise<DistrictEntity>;
    saveWeatherStation(weatherStation:WeatherStationEntity,wsRepo:Repository<WeatherStationEntity>):Promise<WeatherStationEntity>;
}