import { postRequest } from "../libs/AxiosService.util";
  
  export async function serviceCreateNotification(params) {
    return await postRequest("notifications/my", params);
  }
  export async function serviceUpdateNotification(params) {
    return await postRequest("notifications/my", params);
  }
  
  export async function serviceDeleteNotification(params) {
    return await postRequest("notifications/my", params);
  }
  export async function serviceGetNotificationDetails(params) {
    return await postRequest("notifications/my", params);
  }
  export async function serviceGetNotification(params) {
    return await postRequest("notifications/my", params);
  }
  export async function servicesLeaveDetailApprove(params){
    return await postRequest("notifications/my", params);
  }
  export async function serviceLeaveApprove(params){
    return await postRequest("notifications/my", params);
  }
  
  export async function serviceLeaveReject(params){
    return await postRequest("notifications/my", params);
  }
  export async function serviceLeaveCount(params){
    return await postRequest("notifications/my", params);
  }
  export async function serviceLeaveCreate(params) {
    return await postRequest("notifications/my", params);
  }

  export async function serviceNotificationReadUnRead(params){
    return await postRequest("notifications/mark/read",params)
  }

  export async function serviceNotificationCountData(params){
    return await postRequest("notifications/my/count",params)

  }
  