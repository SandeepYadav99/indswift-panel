import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceLoginCandidateIrf(params) {
  return await postRequest("candidate/irf/authenticate", params);
}
export async function serviceGetIrfDetails(params) {
  return await postRequest("candidate/irf/details", params);
}
export async function serviceUpdateIrfForm(params) {
  return await formDataRequest("candidate/irf/create", params);
}
