import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceDeleteOngoingLoans(params) {
  return await postRequest("employee/loans/review/delete", params);
}
export async function serviceGetOngoingLoansDetails(params) {
  return await postRequest("employee/loans/review/details", params);
}
export async function serviceGetOngoingLoans(params) {
  return await postRequest("employee/loans/review/status", params);
}
export async function serviceGetDetailsLoanInfo(params) {
  return await postRequest("employee/loans/guarantee", params);
}
export async function serviceGetClaimDetail(params) {
  return await getRequest("employee/loans/review", params);
}
export async function serviceApproveOngoingLoans(params) {
  return await postRequest("employee/loans/guarantee/accept", params);
}
export async function serviceRejectOngoingLoans(params) {
  return await postRequest("employee/loans/guarantee/reject", params);
}
