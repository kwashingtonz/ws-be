"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToTestDatabase = exports.ConnectToDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const environment_configuration_1 = require("./environment-configuration");
const environmentConfiguration = new environment_configuration_1.EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    host: appConfig.getHost(),
    port: appConfig.getDataBasePort(),
    username: appConfig.getUserName(),
    password: appConfig.getPassword(),
    database: appConfig.getDataBase(),
    synchronize: false,
    entities: [
    // someEntity
    ],
    logging: false,
    subscribers: [
    // subscriber
    ],
    cache: {
        type: "redis",
        options: {
            host: appConfig.getRedisHost(),
            port: appConfig.getRedisPort()
        },
        duration: 60000, // 60 seconds
    }
});
const ConnectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield exports.AppDataSource.initialize();
        if (connection.isInitialized) {
            console.log("Database connected !");
        }
        else {
            console.log("Database Not connected !");
        }
    }
    catch (error) {
        console.log(error);
        console.log("Database connection Failed !");
    }
});
exports.ConnectToDatabase = ConnectToDatabase;
const ConnectToTestDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield exports.AppDataSource.initialize();
        if (connection.isInitialized) {
            console.log("Database connected !");
        }
        else {
            console.log("Database Not connected !");
        }
    }
    catch (error) {
        console.log(error);
        console.log("Database connection Failed !");
    }
});
exports.ConnectToTestDatabase = ConnectToTestDatabase;
