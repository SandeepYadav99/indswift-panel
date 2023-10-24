import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceLeaveCreate(params) {
  return await formDataRequest("leaves/create", params);
}

export async function serviceLeaveList(params){
  return await postRequest("leaves",params)
}
