import { Repository } from "typeorm";
import { WeatherStationEntity } from "../../entity/weather-station-entity";
import WeatherDataDao from "../weather-data-dao";
import { WeatherDataDto } from "../../dto/weather-data/weather-data-dto";
import { ReadingEntity } from "../../entity/reading-entity";
import { AppDataSource } from "../../configuration/database-configuration";
import { CountryEntity } from "../../entity/country-entity";
import { DistrictEntity } from "../../entity/district-entity";

export class WeatherDataDaoImpl implements WeatherDataDao {
    
    async findWeatherStationByIds(weatherDataDto: WeatherDataDto,wsRepo:Repository<WeatherStationEntity>):Promise<WeatherStationEntity>{

        let query = wsRepo.createQueryBuilder("ws")
        .leftJoin("ws.district","d")
        .leftJoin("d.country","c")
        .where("ws.id = :wsId",{wsId:weatherDataDto.getWeatherStationId()})
        .andWhere("d.id = :dId",{dId:weatherDataDto.getDistrictId()})
        .andWhere("c.id = :cId",{cId:weatherDataDto.getCountryId()})

        let result = query.getOne();

        return result;
    }

    async saveReading(reading:ReadingEntity,readingsRepo:Repository<ReadingEntity>):Promise<ReadingEntity>{
        let readEnt = await readingsRepo.save(reading);
        return readEnt;
    }

    async getCountries(): Promise<CountryEntity[]> {
        let countryRepo: Repository<CountryEntity> = AppDataSource.getRepository(CountryEntity);
        let result = await countryRepo.find();
        return result;
    }

    async getDistrictsByCountryId(countryId:number):Promise<DistrictEntity[]>{
        let districtRepo: Repository<DistrictEntity> = AppDataSource.getRepository(DistrictEntity);

        let query = districtRepo.createQueryBuilder("d")
        .leftJoin("d.country","c")
        .where("c.id = :cId",{cId:countryId});

        let result = query.getMany();

        return result;
    }

    async getWeatherStationsByCountryIdAndDistrictId(countryId:number,districtId:number):Promise<WeatherStationEntity[]>{
        let wsRepo: Repository<WeatherStationEntity> = AppDataSource.getRepository(WeatherStationEntity);

        let query = wsRepo.createQueryBuilder("ws")
        .leftJoin("ws.district","d")
        .leftJoin("d.country","c")
        .where("c.id = :cId",{cId:countryId})
        .andWhere("d.id = :dId",{dId:districtId});

        let result = query.getMany();

        return result;
    }

    async getLatestReadingByCountryDistrictAndWeatherStationIds(countryId:number,districtId:number,weatherStationId:number):Promise<ReadingEntity>{
        let readingsRepo: Repository<ReadingEntity> = AppDataSource.getRepository(ReadingEntity);

        let query = readingsRepo.createQueryBuilder("r")
        .leftJoin("r.weatherStation","ws")
        .leftJoin("ws.district","d")
        .leftJoin("d.country","c")
        .where("c.id = :cId",{cId:countryId})
        .andWhere("d.id = :dId",{dId:districtId})
        .andWhere("ws.id = :wsId",{wsId:weatherStationId})
        .orderBy("r.dateTime","DESC")
        
        let result = query.getOne();

        return result;
    }

}