import { postRequest } from "../libs/AxiosService.util";

export async function serviceGetNotifications(params) {
    return await postRequest("notifications/my", params);
  }