import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateFinalFormApproval(params) {
  return await formDataRequest("ff/review/create", params);
}
export async function serviceUpdateFinalFormApproval(params) {
  return await postRequest("ff/review/form/submit", params);
}

export async function serviceDeleteFinalFormApproval(params) {
  return await postRequest("ff/review/delete", params);
}
export async function serviceGetFinalFormApprovalDetails(params) {
  return await postRequest("ff/review/details", params);
}
export async function serviceGetFinalFormApprove(params) {
  return await postRequest("ff/review/accept", params);
}
export async function serviceGetFinalFormReject(params) {
  return await postRequest("ff/review/reject", params);
}
export async function serviceGetFormDebounceDetails(params) {
  return await postRequest("ff/review/totals", params);
}
export async function serviceGetFinalFormApproval(params) {
  return await postRequest("ff/review", params);
}
