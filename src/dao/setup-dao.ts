import { Repository } from "typeorm";
import { CountryEntity } from "../entity/country-entity";

export default interface SetupDao {

    saveInitialSetup(country:CountryEntity,countryRepo:Repository<CountryEntity>):Promise<CountryEntity>;
}