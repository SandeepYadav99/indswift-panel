import { postRequest } from "../libs/AxiosService.util";
  
  export async function serviceCreateNotificationModule(params) {
    return await postRequest("notifications/send", params);
  }
  export async function serviceDetailNotificationModule(params) {
    return await postRequest("notifications/detail", params);
  }
  
  export async function serviceGetNotificationModule(params) {
    return await postRequest("notifications", params);
  }
 