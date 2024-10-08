import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetCadreEntitlementDetails(params) {
  return await postRequest("cadres/entitlements", params);
}
export async function serviceGetCadreFormDetails (params) {
  return await postRequest('cadres/entitlements/detail', params);
}