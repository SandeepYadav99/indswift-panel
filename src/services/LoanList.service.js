import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceDeleteLoanList(params) {
  return await postRequest("employee/loans/review/delete", params);
}
export async function serviceGetLoanListDetails(params) {
  return await postRequest("employee/loans/review/details", params);
}
export async function serviceGetLoanList(params) {
  return await postRequest("employee/loans/review", params);
}
export async function serviceGetDetailsLoanInfo(params) {
  return await postRequest("employee/loans/guarantee", params);
}
export async function serviceGetClaimDetail(params) {
  return await getRequest("employee/loans/review", params);
}
export async function serviceApproveLoanList(params) {
  return await postRequest("employee/loans/guarantee/accept", params);
}
export async function serviceRejectLoanList(params) {
  return await postRequest("employee/loans/guarantee/reject", params);
}
export async function serviceAuthenticateGuarantor(params) {
  return await postRequest("employee/loans/guarantee/authenticate", params);
}
export async function serviceApproveEmployeeLoan(params) {
  return await postRequest("employee/loans/review/accept", params);
}
export async function serviceRejectEmployeeList(params) {
  return await postRequest("employee/loans/review/reject", params);
}
export async function serviceCloseEmployeeLoan(params) {
  return await postRequest("employee/loans/closed", params);
}
export async function serviceGetLoanHistory(params) {
  return await postRequest("employee/loans/previous/history", params);
}
export async function serviceGetLoanEligiblityCalculator(params) {
  return await postRequest("employee/loans/eligibility/calcluations", params);
}
export async function serviceGetLoanSchedule(params) {
  return await postRequest("employee/loans/recovery/schedule", params);
}
export async function serviceUpdateLoanFormDetails(params) {
  return await postRequest("employee/loans/review/accept", params);
}
export async function serviceGetLoanBudgetPosition(params) {
  return await postRequest("employee/loans/budget/positioning", params);
}
export async function serviceGetLoanBudgetOutstanding(params) {
  return await postRequest("employee/loans/budget/outstanding", params);
}
export async function serviceGetLoanProcessDetails(params) {
  return await postRequest("employee/loans/details", params);
}
export async function serviceGetLoanBankSheetDetails(params) {
  return await postRequest("employee/loans/export/bank/transfer", params);
}

