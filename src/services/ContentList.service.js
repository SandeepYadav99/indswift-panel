import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateContentList(params) {
  return await formDataRequest("content/create", params);
}
export async function serviceUpdateContentList(params) {
  return await postRequest("content/form/submit", params);
}

export async function serviceDeleteContentList(params) {
  return await postRequest("content/delete", params);
}
export async function serviceGetContentListDetails(params) {
  return await postRequest("content/details", params);
}
export async function serviceGetFormDebounceDetails(params) {
  return await postRequest("content/totals", params);
}
export async function serviceGetContentList(params) {
  return await postRequest("content", params);
}

export async function serviceGetEmployeeContentList(params) {
  return await postRequest("content");
}
export async function serviceExportContentList(params) {
  return await postRequest("content/report", params);
}
