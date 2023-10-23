import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceLeaveCreate(params) {
  return await formDataRequest("leaves/create", params);
}
