"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
const common_response_1 = require("../dto/common-response");
class Utility {
    /**
     * get success common response
     * @param extra
     * @param code
     * @returns common response
     */
    static getSuccessResponse(extra, code) {
        let commonResponse = new common_response_1.CommonResponse();
        commonResponse.setStatus(true);
        commonResponse.setExtra(extra);
        commonResponse.setCode(code);
        return commonResponse;
    }
    /**
     * get failed common response
     * @param extra
     * @param code
     * @returns common response
     */
    static getErrorResponse(extra, code) {
        let commonResponse = new common_response_1.CommonResponse();
        commonResponse.setStatus(false);
        commonResponse.setExtra(extra);
        commonResponse.setCode(code);
        return commonResponse;
    }
}
exports.Utility = Utility;
