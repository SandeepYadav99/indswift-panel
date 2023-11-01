import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateExitInterview(params) {
  return await formDataRequest("exit/interview/exit/intervieweate", params);
}
export async function serviceUpdateExitInterview(params) {
  return await postRequest("exit/interview/update", params);
}

export async function serviceDeleteExitInterview(params) {
  return await postRequest("exit/interview/delete", params);
}
export async function serviceGetExitInterviewDetails(params) {
  return await postRequest("employee/claims/details", params);
}
export async function serviceGetExitInterview(params) {
  return await postRequest("exit/interview", params);
}
export async function serviceExitInterviewLogin(params) {
  return await postRequest("exit/interview/authenticate", params);
}
export async function serviceGetExitFormDetails(params) {
  return await postRequest("exit/interview/form", params);
}
