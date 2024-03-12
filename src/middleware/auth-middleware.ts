/* eslint-disable no-unused-vars */
import express, { Response } from "express";
import RedisConfiguration from "../configuration/redis-configurations";
import { JwtHelper } from "../support/jwt-helper";
import { EnvironmentConfiguration } from "../configuration/environment-configuration";
import { LoginUserInfo } from "../dto/system-access/login-user";

/**
 * authentication middle ware
 */
let jwtHelper: JwtHelper = new JwtHelper();
module.exports = async (req: express.Request, res: express.Response, next) => {
  // check token and headers
  try {
    // check authorization
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      // first verify jwt token
      jwtHelper.verifyJwt(token);
      const exists = await RedisConfiguration.exists();
      const isExists = await exists(token);
      // first check user exists
      if (isExists) {
        const get = await RedisConfiguration.getAsync();

        const storeUser = await get(token);

        // convert to dto
        const loginUserDto: LoginUserInfo  = new  LoginUserInfo();
        Object.assign(loginUserDto, JSON.parse(storeUser));
        req.body.loginUserInfoJWT = loginUserDto;
        next();
      } else {
        res.sendStatus(401);
      }
    } else if(req.headers['x-api-key']){

      const api_key = req.headers['x-api-key'];

      const environmentConfiguration = new EnvironmentConfiguration();
      const appConfig = environmentConfiguration.readAppConfiguration();

      if(api_key === appConfig.getApiKey()){
        next();
      }else{
        res.sendStatus(401);
      }

    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};
