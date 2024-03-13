import express from "express";
import { CommonResponse } from "../common/dto/common-response";
import { SetupService } from "../services/setup/setup-service";
import { SetupServiceImpl } from "../services/setup/impl/setup-service-impl";

let setupService: SetupService = new SetupServiceImpl();

exports.initalSetup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
let cr = new CommonResponse();
try {
    cr = await setupService.initialSetup();
    res.send(cr);
  } catch (error) {
    cr.setStatus(false);
    cr.setExtra(error);
    next(error);
  }
};