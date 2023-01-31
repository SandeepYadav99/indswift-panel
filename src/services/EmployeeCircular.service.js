import { getRequest } from "../libs/AxiosService.util";

export async function serviceGetEmployeeCircular(params) {
  return await getRequest("hr/circulars/list", params);
}
