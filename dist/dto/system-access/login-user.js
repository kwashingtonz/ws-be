"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserInfo = void 0;
class LoginUserInfo {
    fillViaObject(userObj) {
        this.jwtToken = userObj.jwtToken;
        this.userId = userObj.userId;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    getJwtToken() {
        return this.jwtToken;
    }
    setJwtToken(jwtToken) {
        this.jwtToken = jwtToken;
    }
}
exports.LoginUserInfo = LoginUserInfo;
