import { CommonResponse } from "../../common/dto/common-response";

export interface SetupService{
  initialSetup(): Promise<CommonResponse>;
}
