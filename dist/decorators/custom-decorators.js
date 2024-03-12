"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAppConfiguration = exports.getRoutes = exports.NodeApplication = void 0;
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const environment_configuration_1 = require("../configuration/environment-configuration");
const http_log_configuration_1 = __importDefault(require("../configuration/http-log-configuration"));
const cors_1 = __importDefault(require("cors"));
const route_configuration_1 = require("../configuration/route-configuration");
const database_configuration_1 = require("../configuration/database-configuration");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const exception_middleware_1 = __importDefault(require("../middleware/exception-middleware"));
const redis_configurations_1 = __importDefault(require("../configuration/redis-configurations"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_configuration_1 = __importDefault(require("../configuration/swagger-configuration"));
/**
 * main application configuration
 * set up db , loggers , cors and etc
 * @param constructor
 */
function NodeApplication(constructor) {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(http_log_configuration_1.default);
    app.use(express_1.default.json({ limit: "50mb" }));
    app.use((0, cookie_parser_1.default)());
    // config routes
    getRoutes(app);
    const server = http.createServer(app);
    // configuration read from system environment
    let appConfigurationDto = readAppConfiguration();
    const port = appConfigurationDto.getPort();
    // error handler middleware
    app.use(exception_middleware_1.default);
    // get redis configurations
    let redisConfiguration = new redis_configurations_1.default();
    // connect to redis server
    redisConfiguration.redisConfig();
    // connect to data base
    (0, database_configuration_1.ConnectToDatabase)();
    // start server
    app.listen(port);
    // swagger configure
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_configuration_1.default));
    // call prototype method
    constructor.prototype.run(port);
}
exports.NodeApplication = NodeApplication;
function getRoutes(app) {
    let routeConfiguration = new route_configuration_1.RouteConfiguration();
    routeConfiguration.configRoutes(app);
}
exports.getRoutes = getRoutes;
function readAppConfiguration() {
    let configurationReader = new environment_configuration_1.EnvironmentConfiguration();
    let appConfigurationDto = configurationReader.readAppConfiguration();
    return appConfigurationDto;
}
exports.readAppConfiguration = readAppConfiguration;
