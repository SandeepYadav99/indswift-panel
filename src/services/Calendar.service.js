

import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetCalendar(params) {
  return await postRequest("cadres/entitlements", params);
}
export async function serviceGetCadreFormDetails (params) {
  return await postRequest('cadres/entitlements/detail', params);
}