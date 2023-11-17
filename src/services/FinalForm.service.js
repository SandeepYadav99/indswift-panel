import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateFinalForm(params) {
  return await formDataRequest("ff/create", params);
}
export async function serviceUpdateFinalForm(params) {
  return await postRequest("ff/form/submit", params);
}

export async function serviceDeleteFinalForm(params) {
  return await postRequest("ff/delete", params);
}
export async function serviceGetFinalFormDetails(params) {
  return await postRequest("ff/details", params);
}
export async function serviceGetFormDebounceDetails(params) {
  return await postRequest("ff/totals", params);
}
export async function serviceGetFinalForm(params) {
  return await postRequest("ff", params);
}
export async function serviceSubmitFFForm(params) {
  return await formDataRequest("ff/submit/form", params);
}