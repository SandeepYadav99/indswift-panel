import { getRequest } from "../libs/AxiosService.util";

export async function serviceGetEmployeeHRPolicy(params) {
  return await getRequest("hr/policies/list", params);
}
