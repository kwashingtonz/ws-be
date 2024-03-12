import jwt from "jsonwebtoken";
import { EnvironmentConfiguration } from "../configuration/environment-configuration";
import { LoginUserInfo } from "../dto/system-access/login-user";

let environmentConfiguration: EnvironmentConfiguration = new EnvironmentConfiguration();
let appConfiguration = environmentConfiguration.readAppConfiguration();
/**
 * help to build jwt token
 */
export class JwtHelper {
  /**
   * create jwt for login user
   * @param loginUserInfo
   */
  createJwt(loginUserInfo: LoginUserInfo): any {
    let userObj: { userId: number; } = {
      userId: loginUserInfo.getUserId(),
    };

    let jwtToken = jwt.sign(userObj, appConfiguration.getJwtSecret(), {expiresIn: '90d'});
    return jwtToken;
  }

  /**
   * verify jwt token
   *
   * @param jwtToken
   * @returns loginUserInfo , if error occur then return exception
   */
  verifyJwt(jwtToken: any): LoginUserInfo {
    let loginUserObj: { userId: number; } = jwt.verify(
      jwtToken,
      appConfiguration.getJwtSecret()
    );
    let loginUserInfo = new LoginUserInfo();
    loginUserInfo.setUserId(loginUserObj.userId);
    return loginUserInfo;
  }
}
