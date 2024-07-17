import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateLetterHead(params) {
  return await formDataRequest("letter/heads/create", params);
}
export async function serviceUpdateLetterHead(params) {
  return await formDataRequest("letter/heads/update", params);
}

export async function serviceDeleteLetterHead(params) {
  return await postRequest("letter/heads/delete", params);
}
export async function serviceGetLetterHeadDetails(params) {
  return await postRequest("letter/heads/detail", params);
}
export async function serviceGetFormDebounceDetails(params) {
  return await postRequest("letter/heads/totals", params);
}
export async function serviceGetLetterHead(params) {
  return await postRequest("letter/heads", params);
}

export async function serviceGetEmployeeLetterHead(params) {
  return await postRequest("letter/heads");
}
export async function serviceExportLetterHead(params) {
  return await postRequest("letter/heads/report", params);
}