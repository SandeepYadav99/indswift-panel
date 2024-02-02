import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateTaxList(params) {
  return await formDataRequest("tax/rebate/create", params);
}
export async function serviceUpdateTaxList(params) {
  return await postRequest("tax/rebate/form/submit", params);
}

export async function serviceDeleteTaxList(params) {
  return await postRequest("tax/rebate/delete", params);
}
export async function serviceGetTaxListDetails(params) {
  return await postRequest("tax/rebate/details", params);
}
export async function serviceGetFormDebounceDetails(params) {
  return await postRequest("tax/rebate/totals", params);
}
export async function serviceGetTaxList(params) {
  return await postRequest("tax/rebate", params);
}