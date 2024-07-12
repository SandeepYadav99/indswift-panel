import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateContentList(params) {
  return await formDataRequest("letter/contents/create", params);
}
export async function serviceUpdateContentList(params) {
  return await postRequest("letter/contents/form/submit", params);
}

export async function serviceDeleteContentList(params) {
  return await postRequest("letter/contents/delete", params);
}
export async function serviceGetContentListDetails(params) {
  return await postRequest("letter/contents/details", params);
}
export async function serviceGetFormDebounceDetails(params) {
  return await postRequest("letter/contents/totals", params);
}
export async function serviceGetContentList(params) {
  return await postRequest("letter/contents", params);
}

export async function serviceGetEmployeeContentList(params) {
  return await postRequest("letter/contents");
}
export async function serviceExportContentList(params) {
  return await postRequest("letter/contents/report", params);
}
