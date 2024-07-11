import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateLetterHead(params) {
  return await formDataRequest("letterhead/create", params);
}
export async function serviceUpdateLetterHead(params) {
  return await postRequest("letterhead/form/submit", params);
}

export async function serviceDeleteLetterHead(params) {
  return await postRequest("letterhead/delete", params);
}
export async function serviceGetLetterHeadDetails(params) {
  return await postRequest("letterhead/details", params);
}
export async function serviceGetFormDebounceDetails(params) {
  return await postRequest("letterhead/totals", params);
}
export async function serviceGetLetterHead(params) {
  return await postRequest("letterhead", params);
}

export async function serviceGetEmployeeLetterHead(params) {
  return await postRequest("letterhead");
}
export async function serviceExportLetterHead(params) {
  return await postRequest("letterhead/report", params);
}