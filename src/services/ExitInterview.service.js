import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateExitInterview(params) {
  return await formDataRequest("exit/interview/exit/intervieweate", params);
}
export async function serviceUpdateExitInterview(params) {
  return await postRequest("exit/interview/form/submit", params);
}

export async function serviceDeleteExitInterview(params) {
  return await postRequest("exit/interview/delete", params);
}
export async function serviceGetExitInterviewDetails(params) {
  return await postRequest("exit/interview/details", params);
}
export async function serviceGetExitInterview(params) {
  return await postRequest("exit/interview", params);
}
export async function serviceGetCloneExitInterview(params) {
  return await postRequest("exit/interview/clone", params);
}
export async function serviceExitInterviewLogin(params) {
  return await postRequest("exit/interview/authenticate", params);
}
export async function serviceGetExitFormDetails(params) {
  return await postRequest("exit/interview/form", params);
}
export async function serviceResendExitForm(params) {
  return await postRequest("exit/interview/share", params);
}
export async function serviceHrComments(params) {
  return await postRequest("exit/interview/comment/submit", params);
}
