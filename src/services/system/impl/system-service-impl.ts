import { Utility } from "../../../common/class/Utility";
import { CommonResponse } from "../../../common/dto/common-response";
import { SystemService } from "../system-service";
/**
 * this class for identify system is running or not
 */
export class SystemServiceImpl implements SystemService {
  /**
   * will return system is up or not
   * @author
   * @returns common response object
   *
   */
  async systemHealth(): Promise<CommonResponse> {
    // throw new ValidationException(CodesRes.validationError,"Id not")
    // let a:any = {}
    // a.i.i
    return Utility.getSuccessResponse("System is up and running",'200');
  }
}
