import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateLeaveModule(params) {
  return await formDataRequest("leaves/review/create", params);
}
export async function serviceUpdateLeaveModule(params) {
  return await postRequest("leaves/review/update", params);
}

export async function serviceDeleteLeaveModule(params) {
  return await postRequest("leaves/review/delete", params);
}
export async function serviceGetLeaveModuleDetails(params) {
  return await postRequest("employee/claims/details", params);
}
export async function serviceGetLeaveModule(params) {
  return await postRequest("leaves/review", params);
}
export async function servicesLeaveDetailApprove(params){
  return await postRequest("leaves/review/details",params)
}
export async function serviceLeaveApprove(params){
  return await postRequest("leaves/review/accept",params)
}

export async function serviceLeaveReject(params){
  return await postRequest("leaves/review/reject",params)
}
export async function serviceLeaveCount(params){
  return await postRequest("leaves/count",params)
}
export async function serviceLeaveCreate(params) {
  return await formDataRequest("leaves/create", params);
}
