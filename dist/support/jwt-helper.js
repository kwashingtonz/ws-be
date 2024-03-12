"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_configuration_1 = require("../configuration/environment-configuration");
const login_user_1 = require("../dto/system-access/login-user");
let environmentConfiguration = new environment_configuration_1.EnvironmentConfiguration();
let appConfiguration = environmentConfiguration.readAppConfiguration();
/**
 * help to build jwt token
 */
class JwtHelper {
    /**
     * create jwt for login user
     * @param loginUserInfo
     */
    createJwt(loginUserInfo) {
        let userObj = {
            userId: loginUserInfo.getUserId(),
        };
        let jwtToken = jsonwebtoken_1.default.sign(userObj, appConfiguration.getJwtSecret(), { expiresIn: '90d' });
        return jwtToken;
    }
    /**
     * verify jwt token
     *
     * @param jwtToken
     * @returns loginUserInfo , if error occur then return exception
     */
    verifyJwt(jwtToken) {
        let loginUserObj = jsonwebtoken_1.default.verify(jwtToken, appConfiguration.getJwtSecret());
        let loginUserInfo = new login_user_1.LoginUserInfo();
        loginUserInfo.setUserId(loginUserObj.userId);
        return loginUserInfo;
    }
}
exports.JwtHelper = JwtHelper;
