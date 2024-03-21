import config from "config";
import express, { Request, Response, Router } from "express";
import * as http from "http";
import { AppConfigurationsDto } from "../common/dto/app-configuration-dto";
import { EnvironmentConfiguration } from "../configuration/environment-configuration";
import morganMiddleware from "../configuration/http-log-configuration";
import cors from "cors";
import { RouteConfiguration } from "../configuration/route-configuration";
import { ConnectToDatabase } from "../configuration/database-configuration";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "../middleware/exception-middleware";
import fs from "fs";
import RedisConfiguration from "../configuration/redis-configurations";
import swaggerUI from 'swagger-ui-express';
import openapiSpecification from "../configuration/swagger-configuration";
import { Server as SocketIOServer } from 'socket.io';

const { setSocketInstance } = require("../support/socket-io-instance");

/**
 * main application configuration
 * set up db , loggers , cors and etc
 * @param constructor
 */
export function NodeApplication<T extends { new(...args: any[]): {} }>(constructor: T) {
  const app = express();
  app.use(cors());
  app.use(morganMiddleware);
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  // config routes
  getRoutes(app);

  // configuration read from system environment
  let appConfigurationDto: AppConfigurationsDto = readAppConfiguration();
  const port: Number = appConfigurationDto.getPort();

  // error handler middleware
  app.use(errorHandlerMiddleware);

  // get redis configurations
  let redisConfiguration:RedisConfiguration = new RedisConfiguration();

  // connect to redis server
  redisConfiguration.redisConfig();

  // connect to data base
  ConnectToDatabase();
  
  // swagger configure
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification))
  
  //socketIO
  const clientHost = appConfigurationDto.getClientHost();
  const httpServer = http.createServer(app);
  const io = new SocketIOServer(httpServer,{
    cors: {
      origin: clientHost,
      methods: ["GET", "POST"]
    }
  });
  setSocketInstance(io);
  
  // start server
  httpServer.listen(port);
  
  // call prototype method
  constructor.prototype.run(port);
}

export function getRoutes(app: express.Application) {
  let routeConfiguration: RouteConfiguration = new RouteConfiguration();
  routeConfiguration.configRoutes(app);
}

export function readAppConfiguration(): AppConfigurationsDto {
  let configurationReader: EnvironmentConfiguration = new EnvironmentConfiguration();
  let appConfigurationDto: AppConfigurationsDto = configurationReader.readAppConfiguration();
  return appConfigurationDto;
}
