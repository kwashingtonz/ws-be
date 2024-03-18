import { CommonResponse } from "../../../common/dto/common-response";
import { AppDataSource } from "../../../configuration/database-configuration";
import { SetupDaoImpl } from "../../../dao/impl/setup-dao-impl";
import SetupDao from "../../../dao/setup-dao";
import { CountryEntity } from "../../../entity/country-entity";
import { DistrictEntity } from "../../../entity/district-entity";
import { WeatherStationEntity } from "../../../entity/weather-station-entity";
import { SetupService } from "../setup-service";

export class SetupServiceImpl implements SetupService {

  setupDao : SetupDao = new SetupDaoImpl();

  async initialSetup(): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {

      await AppDataSource.transaction(async (transaction) => {

        const countryRepo = transaction.getRepository(CountryEntity);
        const districtRepo = transaction.getRepository(DistrictEntity);
        const wsRepo = transaction.getRepository(WeatherStationEntity);

        const country : CountryEntity = new CountryEntity();
        country.id = 1;
        country.countryName = "Sri Lanka";

        let savedCountry : CountryEntity = await this.setupDao.saveCountry(country, countryRepo);

        const weatherStations = [
            { id: 1, name: 'Colombo' },
            { id: 2, name: 'Gampaha' },
            { id: 3, name: 'Kalutara' },
            { id: 4, name: 'Kandy' },
            { id: 5, name: 'Matale' },
            { id: 6, name: 'Nuwara Eliya' },
            { id: 7, name: 'Galle' },
            { id: 8, name: 'Matara' },
            { id: 9, name: 'Hambantota' },
            { id: 10, name: 'Jaffna' },
            { id: 11, name: 'Kilinochchi' },
            { id: 12, name: 'Mannar' },
            { id: 13, name: 'Vavuniya' },
            { id: 14, name: 'Mullaitivu' },
            { id: 15, name: 'Batticaloa' },
            { id: 16, name: 'Ampara' },
            { id: 17, name: 'Trincomalee' },
            { id: 18, name: 'Kurunegala' },
            { id: 19, name: 'Puttalam' },
            { id: 20, name: 'Anuradhapura' },
            { id: 21, name: 'Polonnaruwa' },
            { id: 22, name: 'Badulla' },
            { id: 23, name: 'Monaragala' },
            { id: 24, name: 'Ratnapura' },
            { id: 25, name: 'Kegalle' }
          ];

          for (const weatherStation of weatherStations) {

            const district : DistrictEntity = new DistrictEntity();
            district.id = weatherStation.id;
            district.districtName = weatherStation.name;
            district.country = savedCountry;

            let savedDistrict : DistrictEntity = await this.setupDao.saveDistrict(district, districtRepo);

            const ws : WeatherStationEntity = new WeatherStationEntity();
            ws.id = weatherStation.id;
            ws.weatherStationName = weatherStation.name;
            ws.district = savedDistrict;

            await this.setupDao.saveWeatherStation(ws, wsRepo);
            
          }

      });
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
