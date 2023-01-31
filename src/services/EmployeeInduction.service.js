import { getRequest } from "../libs/AxiosService.util";

export async function serviceGetEmployeeInduction(params) {
  return await getRequest("app/settings/employee/induction", params);
}
