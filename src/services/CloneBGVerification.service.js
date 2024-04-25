import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceEmployeeCloneBGVList(params) {
  return await postRequest("employee/verification/list/clone", params);
}

export async function serviceEmployeeCloneBGVCreate(params) {
  return await postRequest("employee/verification/create/clone", params);
}

export async function serviceEmployeeCloneBGVUpdate(params) {
  return await postRequest("employee/verification/update/clone", params);
}