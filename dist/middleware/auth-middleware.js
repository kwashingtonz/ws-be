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
const redis_configurations_1 = __importDefault(require("../configuration/redis-configurations"));
const jwt_helper_1 = require("../support/jwt-helper");
const environment_configuration_1 = require("../configuration/environment-configuration");
const login_user_1 = require("../dto/system-access/login-user");
/**
 * authentication middle ware
 */
let jwtHelper = new jwt_helper_1.JwtHelper();
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check token and headers
    try {
        // check authorization
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            // first verify jwt token
            jwtHelper.verifyJwt(token);
            const exists = yield redis_configurations_1.default.exists();
            const isExists = yield exists(token);
            // first check user exists
            if (isExists) {
                const get = yield redis_configurations_1.default.getAsync();
                const storeUser = yield get(token);
                // convert to dto
                const loginUserDto = new login_user_1.LoginUserInfo();
                Object.assign(loginUserDto, JSON.parse(storeUser));
                req.body.loginUserInfoJWT = loginUserDto;
                next();
            }
            else {
                res.sendStatus(401);
            }
        }
        else if (req.headers['x-api-key']) {
            const api_key = req.headers['x-api-key'];
            const environmentConfiguration = new environment_configuration_1.EnvironmentConfiguration();
            const appConfig = environmentConfiguration.readAppConfiguration();
            if (api_key === appConfig.getApiKey()) {
                next();
            }
            else {
                res.sendStatus(401);
            }
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (error) {
        res.sendStatus(401);
    }
});
