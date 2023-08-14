import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateNewEmployeeList(params) {
  return await formDataRequest("employees/pending/create", params);
}
export async function serviceUpdateNewEmployeeList(params) {
  return await postRequest("employees/pending/update", params);
}

export async function serviceGetNewEmployeeList(params) {
  return await postRequest("employees/pending", params);
}
export async function serviceGetNewEmployeeDetails(params) {
  return await postRequest("employees/pending/details", params);
}
export async function serviceGetNewEmployeeReject(params) {
  return await postRequest("employees/pending/reject", params);
}
export async function serviceGetNewEmployeeApprove(params) {
  return await postRequest("employees/pending/approve", params);
}
