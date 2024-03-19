"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigurationsDto = void 0;
class AppConfigurationsDto {
    getPort() {
        return this.port;
    }
    setPort(port) {
        this.port = port;
    }
    getIp() {
        return this.ip;
    }
    setIp(ip) {
        this.ip = ip;
    }
    getHost() {
        return this.host;
    }
    setHost(host) {
        this.host = host;
    }
    getUserName() {
        return this.userName;
    }
    setUserName(userName) {
        this.userName = userName;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getDataBase() {
        return this.dataBase;
    }
    setDataBase(dataBase) {
        this.dataBase = dataBase;
    }
    getDataBasePort() {
        return this.dataBasePort;
    }
    setDataBasePort(dataBasePort) {
        this.dataBasePort = dataBasePort;
    }
    getUrl() {
        return this.url;
    }
    setUrl(url) {
        this.url = url;
    }
    getJwtSecret() {
        return this.jwtSecret;
    }
    setJwtSecret(jwtSecret) {
        this.jwtSecret = jwtSecret;
    }
    getApiKey() {
        return this.apiKey;
    }
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }
    getRedisPort() {
        return this.redisPort;
    }
    setRedisPort(redisPort) {
        this.redisPort = redisPort;
    }
    getRedisHost() {
        return this.redisHost;
    }
    setRedisHost(redisHost) {
        this.redisHost = redisHost;
    }
}
exports.AppConfigurationsDto = AppConfigurationsDto;
