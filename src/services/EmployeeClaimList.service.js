import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateClaimList(params) {
  return await postRequest("//employee/create", params);
}

export async function serviceUpdateClaimList(params) {
  return await postRequest("/employee/update", params);
}

export async function serviceDeleteClaimList(params) {
  return await postRequest("/employee/delete", params);
}

export async function serviceGetClaimList(params) {
  return await postRequest("/employee/claims", params);
}
