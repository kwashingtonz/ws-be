import { Repository } from "typeorm";
import SetupDao from "../setup-dao";
import { CountryEntity } from "../../entity/country-entity";

export class SetupDaoImpl implements SetupDao {

    async saveInitialSetup(country:CountryEntity, countryRepo:Repository<CountryEntity>): Promise<CountryEntity> {
        return countryRepo.save(country);
    }

}