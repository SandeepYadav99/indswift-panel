import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateEmployeeRecord(params) {
  return await formDataRequest("employees/records/versions/create", params);
}

export async function serviceUpdateEmployeeRecord(params) {
  return await formDataRequest("employees/records/versions/create", params);
}

export async function serviceGetEmployeeRecord(params) {
  return await postRequest("employees/records/list", params);
}

export async function serviceGetHREmployeeRecordDetails(params) {
  return await postRequest("hr/announcment/detail", params);
}

export async function serviceDeleteEmployeeRecord(params) {
  return await formDataRequest("hr/announcment/delete", params);
}

export async function serviceCheckEmployeeRecord(params) {
  return await postRequest("hr/announcment/check", params);
}
