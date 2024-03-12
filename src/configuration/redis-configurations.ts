import { EnvironmentConfiguration } from "./environment-configuration";
import redis, {RedisClient} from "redis";
import util from "util";

const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();

/**
 * create redis configuration
 */
 export default class RedisConfiguration {

    public static RedisConnection: RedisClient;
  
    /**
     * create redis client
     */
    async redisConfig(): Promise<void> {
      
  
      // wrap get call as promise
      try {
        RedisConfiguration.RedisConnection = redis.createClient({
          host: appConfig.getRedisHost(),
          port: appConfig.getRedisPort(),
          retry_strategy: function(options) {
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

        const get = await RedisConfiguration.getAsync();
        await get("connect")
        console.log("Redis Connected ! ")

      } catch (error) {
        console.log("Redis Not Connected ! " + error)
      }
    }
  
    /**
     * get
     */
    public static async getAsync(): Promise<any> {
      const getAsync = util.promisify(RedisConfiguration.RedisConnection.get).bind(RedisConfiguration.RedisConnection);
      return getAsync;
    }

    /**
     * flushdb
     */
     public static async flushAsync(): Promise<any> {
      const getAsync = util.promisify(RedisConfiguration.RedisConnection.flushdb).bind(RedisConfiguration.RedisConnection);
      return getAsync;
    }
  
    /**
     * check redis exists
     * @return {any}
     */
    public static async existsAsync(key:String): Promise<boolean> {

      const exists = util.promisify(RedisConfiguration.RedisConnection.exists).bind(RedisConfiguration.RedisConnection);
      const isExists = await exists(key);

      return isExists;
    }

    /**
     * check redis exists
     * @return {any}
     */
     public static async deleteAsync(key:String): Promise<boolean> {

      const del = util.promisify(RedisConfiguration.RedisConnection.del).bind(RedisConfiguration.RedisConnection);
      const isExists = await del(key);

      return isExists;
    }

     /**
     * check redis exists
     * @return {any}
     */
     public static async exists(): Promise<any> {
       const exists = util.promisify(RedisConfiguration.RedisConnection.exists).bind(RedisConfiguration.RedisConnection);
       // const userInformation = await getAsync(token);
       return exists;
    }


  }