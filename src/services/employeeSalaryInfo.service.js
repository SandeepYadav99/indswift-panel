import { postRequest } from "../libs/AxiosService.util";

export async function serviceGetEmployeeSalaryInfo(params) {
  return await postRequest("employees/salary", params);
}
