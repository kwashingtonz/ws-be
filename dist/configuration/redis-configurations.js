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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_configuration_1 = require("./environment-configuration");
const redis_1 = __importDefault(require("redis"));
const util_1 = __importDefault(require("util"));
const environmentConfiguration = new environment_configuration_1.EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();
/**
 * create redis configuration
 */
class RedisConfiguration {
    /**
     * create redis client
     */
    redisConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            // wrap get call as promise
            try {
                RedisConfiguration.RedisConnection = redis_1.default.createClient({
                    host: appConfig.getRedisHost(),
                    port: appConfig.getRedisPort(),
                    retry_strategy: function (options) {
                        if (options.error && options.error.code === "ECONNREFUSED") {
                            console.log("The redis server refused the connection");
                        }
                        if (options.error && options.error.code === "ECONNRESET") {
                            console.log("The redis server is not available");
                        }
                        if (options.total_retry_time > 1000 * 60 * 60) {
                            console.log("Retry time exhausted");
                        }
                        // reconnect after
                        return Math.min(30000);
                    },
                });
                const get = yield RedisConfiguration.getAsync();
                yield get("connect");
                console.log("Redis Connected ! ");
            }
            catch (error) {
                console.log("Redis Not Connected ! " + error);
            }
        });
    }
    /**
     * get
     */
    static getAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const getAsync = util_1.default.promisify(RedisConfiguration.RedisConnection.get).bind(RedisConfiguration.RedisConnection);
            return getAsync;
        });
    }
    /**
     * flushdb
     */
    static flushAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const getAsync = util_1.default.promisify(RedisConfiguration.RedisConnection.flushdb).bind(RedisConfiguration.RedisConnection);
            return getAsync;
        });
    }
    /**
     * check redis exists
     * @return {any}
     */
    static existsAsync(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = util_1.default.promisify(RedisConfiguration.RedisConnection.exists).bind(RedisConfiguration.RedisConnection);
            const isExists = yield exists(key);
            return isExists;
        });
    }
    /**
     * check redis exists
     * @return {any}
     */
    static deleteAsync(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const del = util_1.default.promisify(RedisConfiguration.RedisConnection.del).bind(RedisConfiguration.RedisConnection);
            const isExists = yield del(key);
            return isExists;
        });
    }
    /**
    * check redis exists
    * @return {any}
    */
    static exists() {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = util_1.default.promisify(RedisConfiguration.RedisConnection.exists).bind(RedisConfiguration.RedisConnection);
            // const userInformation = await getAsync(token);
            return exists;
        });
    }
}
exports.default = RedisConfiguration;
