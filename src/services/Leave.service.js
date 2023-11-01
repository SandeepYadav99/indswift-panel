import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceLeaveCreate(params) {
  return await formDataRequest("leaves/create", params);
}

export async function serviceLeaveList(params){
  return await postRequest("leaves",params)
}

export async function serviceLeaveCount(params){
  return await postRequest("leaves/count",params)
}

export async function serviceLeaveDataList(params){
  return await postRequest("leaves/review",params)
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
