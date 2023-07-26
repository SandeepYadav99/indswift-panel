import { postRequest } from "../libs/AxiosService.util";

export async function serviceGetLoanBudgetList(params) {
  return await postRequest("employee/loans/budget", params);
}
export async function serviceGetLoanBudgetCreate(params) {
  return await postRequest("employee/loans/budget/create", params);
}
export async function serviceGetLoanBudgetCheck(params) {
  return await postRequest("employee/loans/budget/fy", params);
}
