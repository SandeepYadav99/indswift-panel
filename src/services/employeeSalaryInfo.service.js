import { postRequest } from "../libs/AxiosService.util";

export async function serviceGetEmployeeSalaryInfo(params) {
  return await postRequest("employee/salary/transactions", params);
}

export async function serviceGetPendingEmployeeSalaryInfo(params) {
  return await postRequest("employees/pending/salary", params);
}
