import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateCloneClaims(params) {
  return await formDataRequest("cr/create", params);
}
export async function serviceUpdateCloneClaims(params) {
  return await postRequest("cr/update", params);
}

export async function serviceDeleteCloneClaims(params) {
  return await postRequest("cr/delete", params);
}
export async function serviceGetCloneClaimsDetails(params) {
  return await postRequest("employee/claims/details", params);
}
export async function serviceGetCloneClaims(params) {
  return await postRequest("cr/clone", params);
}
