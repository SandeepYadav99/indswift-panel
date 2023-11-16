import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateSuccessionA(params) {
  return await formDataRequest("employee/succession/panelist/create", params);
}
export async function serviceUpdateSuccessionA(params) {
  return await postRequest("employee/succession/panelist/form/submit", params);
}

export async function serviceDeleteSuccessionA(params) {
  return await postRequest("employee/succession/panelist/delete", params);
}
export async function serviceGetSuccessionADetails(params) {
  return await postRequest("employee/succession/panelist/details", params);
}
export async function serviceGetFormDebounceDetails(params) {
  return await postRequest("employee/succession/panelist/totals", params);
}
export async function serviceGetSuccessionA(params) {
  return await postRequest("employee/succession/panelist/review/list", params);
}
export async function serviceSubmitFFForm(params) {
  return await formDataRequest("employee/succession/panelist/submit/form", params);
}