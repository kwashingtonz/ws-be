"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentConfiguration = void 0;
const config_1 = __importDefault(require("config"));
const app_configuration_dto_1 = require("../common/dto/app-configuration-dto");
class EnvironmentConfiguration {
    readAppConfiguration() {
        let appConfig = new app_configuration_dto_1.AppConfigurationsDto();
        let port = process.env.server_port;
        appConfig.setPort(port || config_1.default.get("server.port"));
        appConfig.setIp(process.env.server_ip || config_1.default.get("server.ip"));
        appConfig.setHost(process.env.db_host || config_1.default.get("db.host"));
        appConfig.setUserName(process.env.db_user_name || config_1.default.get("db.userName"));
        appConfig.setPassword(process.env.db_password || config_1.default.get("db.password"));
        appConfig.setDataBase(process.env.db_name || config_1.default.get("db.db"));
        let dataBasePort = process.env.db_port;
        appConfig.setDataBasePort(dataBasePort || config_1.default.get("db.port"));
        appConfig.setUrl(process.env.db_url || config_1.default.get("db.url"));
        appConfig.setJwtSecret(process.env.jwtSecret || config_1.default.get("jwtSecret"));
        appConfig.setApiKey(process.env.apiKey || config_1.default.get("apiKey"));
        //redis
        let redisPort = process.env.redisPort;
        appConfig.setRedisPort(redisPort || config_1.default.get("redis.port"));
        appConfig.setRedisHost(process.env.redisHost || config_1.default.get("redis.host"));
        return appConfig;
    }
}
exports.EnvironmentConfiguration = EnvironmentConfiguration;
