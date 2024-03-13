import { Utility } from "../../../common/class/Utility";
import { CommonResponse } from "../../../common/dto/common-response";
import { AppDataSource } from "../../../configuration/database-configuration";
import { SetupDaoImpl } from "../../../dao/impl/setup-dao-impl";
import SetupDao from "../../../dao/setup-dao";
import { CountryEntity } from "../../../entity/country-entity";
import { DistrictEntity } from "../../../entity/district-entity";
import { ReadingEntity } from "../../../entity/reading-entity";
import { WeatherStationEntity } from "../../../entity/weather-station-entity";
import { SetupService } from "../setup-service";

export class SetupServiceImpl implements SetupService {

  setupDao : SetupDao = new SetupDaoImpl();

  async initialSetup(): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {

        let districtArray : DistrictEntity[] = new Array();
        let weatherStations = [
            "Colombo",
            "Gampaha",
            "Kalutara",
            "Kandy",
            "Matale",
            "Nuwara Eliya",
            "Galle",
            "Matara",
            "Hambantota",
            "Jaffna",
            "Kilinochchi",
            "Mannar",
            "Vavuniya",
            "Mullaitivu",
            "Batticaloa",
            "Ampara",
            "Trincomalee",
            "Kurunegala",
            "Puttalam",
            "Anuradhapura",
            "Polonnaruwa",
            "Badulla",
            "Monaragala",
            "Ratnapura",
            "Kegalle"
        ]
        

        for(let i = 0; i < 25; i++){
            let district = new DistrictEntity(i+1,weatherStations[i],[
                new WeatherStationEntity(1,weatherStations[i],[
                    new ReadingEntity(new Date(), 0, 0, 0)
                ])
            ])

            districtArray.push(district)
        }

        const country:CountryEntity = new CountryEntity();
        country.countryId = 1;
        country.countryName = "Sri Lanka"
        country.districts = districtArray;

        const countryRepo = AppDataSource.getMongoRepository(CountryEntity);

        await this.setupDao.saveInitialSetup(country, countryRepo);

        cr.setExtra("Inital Setup Success");
        cr.setStatus(true);
    } catch (error) {
        cr.setStatus(false);
        cr.setExtra(error);
        throw error;
    }
    return cr;
  }
}
