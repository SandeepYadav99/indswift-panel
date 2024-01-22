import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceEmployeeBGVList(params) {
  return await postRequest("employee/verification/list", params);
}

export async function serviceEmployeeBGVCreate(params) {
  return await postRequest("employee/verification/create", params);
}

export async function serviceEmployeeBGVUpdate(params) {
  return await postRequest("employee/verification/update", params);
}

export async function serviceEmployeeBGVDetail(params) {
  return await postRequest("employee/verification/details", params);
}

export async function serviceEmloyeeBGVTable(params) {
  return await postRequest("employee/verification/table", params);
}

export async function serviceBGVDownload(params) {
  return await postRequest("employee/verification/export/report", params);
}
export async function serviceBGVDownloadAll(params) {
  return await postRequest("employee/verification/export/report/all", params);
}
export async function serviceBgvStatusFilter(params){
  return await postRequest("employee/verification/filter/status", params)
}