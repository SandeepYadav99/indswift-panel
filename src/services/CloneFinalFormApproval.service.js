import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateCloneFinalFormApproval(params) {
  return await formDataRequest("ff/review/create", params);
}
export async function serviceUpdateCloneFinalFormApproval(params) {
  return await postRequest("ff/review/form/submit", params);
}

export async function serviceDeleteCloneFinalFormApproval(params) {
  return await postRequest("ff/review/delete", params);
}
export async function serviceGetCloneFinalFormApprovalDetails(params) {
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
export async function serviceGetCloneFinalFormApproval(params) {
  return await postRequest("ff/review/clone", params);
}
export async function serviceGetFinalFormExport(params) {
  return await postRequest("ff/export/bank/transfer", params);
}
