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
const common_response_1 = require("../common/dto/common-response");
const setup_service_impl_1 = require("../services/setup/impl/setup-service-impl");
let setupService = new setup_service_impl_1.SetupServiceImpl();
exports.initalSetup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = new common_response_1.CommonResponse();
    try {
        cr = yield setupService.initialSetup();
        res.send(cr);
    }
    catch (error) {
        cr.setStatus(false);
        cr.setExtra(error);
        next(error);
    }
});
