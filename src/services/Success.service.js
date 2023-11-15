import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceSuccessionLogin(params) {
    return await postRequest("employee/succession/authenticate", params);
  }
  export async function serviceSuccessionDetail(params) {
    return await postRequest("employees/details", params);
  }
  export async function serviceUpdateSuccessionSubmit(params) {
    return await formDataRequest('employee/succession/form/submit', params);
}