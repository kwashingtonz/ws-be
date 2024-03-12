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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemServiceImpl = void 0;
const Utility_1 = require("../../../common/class/Utility");
/**
 * this class for identify system is running or not
 */
class SystemServiceImpl {
    /**
     * will return system is up or not
     * @author
     * @returns common response object
     *
     */
    systemHealth() {
        return __awaiter(this, void 0, void 0, function* () {
            // throw new ValidationException(CodesRes.validationError,"Id not")
            // let a:any = {}
            // a.i.i
            return Utility_1.Utility.getSuccessResponse("System is Up And Running", null);
        });
    }
}
exports.SystemServiceImpl = SystemServiceImpl;
