import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateTaxList(params) {
  return await formDataRequest("tax/rebate/review/create", params);
}
export async function serviceUpdateTaxList(params) {
  return await postRequest("tax/rebate/review/form/submit", params);
}

export async function serviceDeleteTaxList(params) {
  return await postRequest("tax/rebate/review/delete", params);
}
export async function serviceGetTaxListDetails(params) {
  return await postRequest("tax/rebate/review/details", params);
}
export async function serviceGetFormDebounceDetails(params) {
  return await postRequest("tax/rebate/review/totals", params);
}
export async function serviceGetTaxList(params) {
  return await postRequest("tax/rebate/review", params);
}
export async function serviceGetTaxApprove(params) {
  return await postRequest("tax/rebate/review/accept", params);
}
export async function serviceGetTaxReject(params) {
  return await postRequest("tax/rebate/review/reject", params);
}
export async function serviceGetEmployeeTaxList(params) {
  return await postRequest("tax/rebate", params);
}
export async function serviceGetEmployeeTaxDetail(params) {
  return await postRequest("tax/rebate/details", params);
}
export async function serviceExportTaxList(params) {
  return await postRequest('tax/rebate/excel/report', params);
}