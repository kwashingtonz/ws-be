import { Repository } from "typeorm";
import SetupDao from "../setup-dao";
import { CountryEntity } from "../../entity/country-entity";
import { DistrictEntity } from "../../entity/district-entity";
import { WeatherStationEntity } from "../../entity/weather-station-entity";

export class SetupDaoImpl implements SetupDao {
    
    async saveCountry(country:CountryEntity, countryRepo:Repository<CountryEntity>): Promise<CountryEntity> {
        return countryRepo.save(country);
    }
    
    async saveDistrict(district:DistrictEntity, districtRepo:Repository<DistrictEntity>): Promise<DistrictEntity> {
        return districtRepo.save(district);
    }
    
    async saveWeatherStation(weatherStation:WeatherStationEntity, wsRepo:Repository<WeatherStationEntity>): Promise<WeatherStationEntity> {
        return wsRepo.save(weatherStation);
    }

}