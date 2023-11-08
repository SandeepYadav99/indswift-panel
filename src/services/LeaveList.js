import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateLeaveList(params) {
  return await formDataRequest("leaves/create", params);
}
export async function serviceUpdateLeaveList(params) {
  return await postRequest("leaves/update", params);
}

export async function serviceDeleteLeaveList(params) {
  return await postRequest("leaves/delete", params);
}
export async function serviceGetLeaveListDetails(params) {
  return await postRequest("employee/claims/details", params);
}
export async function serviceGetLeaveList(params) {
  return await postRequest("leaves", params);
}
