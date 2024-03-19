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
            { id: 1, name: 'Colombo', code: 'lk-co' },
            { id: 2, name: 'Gampaha', code: 'lk-gq'},
            { id: 3, name: 'Kalutara', code: 'lk-kt' },
            { id: 4, name: 'Kandy', code: 'lk-ky' },
            { id: 5, name: 'Matale', code: 'lk-mt' },
            { id: 6, name: 'Nuwara Eliya', code: 'lk-nw' },
            { id: 7, name: 'Galle', code: 'lk-gl' },
            { id: 8, name: 'Matara', code: 'lk-mh' },
            { id: 9, name: 'Hambantota', code: 'lk-hb' },
            { id: 10, name: 'Jaffna', code: 'lk-ja' },
            { id: 11, name: 'Kilinochchi', code: 'lk-kl' },
            { id: 12, name: 'Mannar', code: 'lk-mb' },
            { id: 13, name: 'Vavuniya', code: 'lk-va' },
            { id: 14, name: 'Mullaitivu', code: 'lk-mp' },
            { id: 15, name: 'Batticaloa', code: 'lk-bc' },
            { id: 16, name: 'Ampara', code: 'lk-ap' },
            { id: 17, name: 'Trincomalee', code: 'lk-tc' },
            { id: 18, name: 'Kurunegala', code: 'lk-kg' },
            { id: 19, name: 'Puttalam', code: 'lk-px' },
            { id: 20, name: 'Anuradhapura', code: 'lk-ad' },
            { id: 21, name: 'Polonnaruwa', code: 'lk-pr' },
            { id: 22, name: 'Badulla', code: 'lk-bd' },
            { id: 23, name: 'Monaragala', code: 'lk-mj' },
            { id: 24, name: 'Ratnapura', code: 'lk-rn' },
            { id: 25, name: 'Kegalle', code: 'lk-ke' }
          ];

          for (const weatherStation of weatherStations) {

            const district : DistrictEntity = new DistrictEntity();
            district.id = weatherStation.id;
            district.districtName = weatherStation.name;
            district.country = savedCountry;
            district.districtCode = weatherStation.code;

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
