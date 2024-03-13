import { DataSource } from "typeorm";
import { EnvironmentConfiguration } from "./environment-configuration";
import { CountryEntity } from "../entity/country-entity";

const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();

export const replaceWithPassword = (stringLink:string):string => {
  let dataString:string = stringLink;
  dataString = dataString.replace("<password>", appConfig.getPassword());
  return dataString
}

export const AppDataSource = new DataSource({
  type: "mongodb",
  // host: appConfig.getHost(),
  // port: appConfig.getDataBasePort(),
  // username: appConfig.getUserName(),
  // password: appConfig.getPassword(),
  // database: appConfig.getDataBase(),
  url: replaceWithPassword(appConfig.getUrl()),
  synchronize: true,
  entities: [
    CountryEntity
  ],
  logging: false,
  subscribers: [
    // subscriber
  ],
  cache : {
    type: "redis",
    options : {
      host: appConfig.getRedisHost(),
      port: appConfig.getRedisPort()
    },
    duration: 60000, // 60 seconds
  }
});

export const ConnectToDatabase = async () => {
  try {
    const connection = await AppDataSource.initialize();
    if (connection.isInitialized) {
      console.log("Database connected !");
    } else {
      console.log("Database Not connected !");
    }

  } catch (error) {
    console.log(error);
    console.log("Database connection Failed !");
  }
};
