import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateHRAnnouncement(params) {
  return await formDataRequest("hr/announcment/create", params);
}

export async function serviceUpdateHRAnnouncement(params) {
  return await formDataRequest("hr/announcment/update", params);
}

export async function serviceGetHRAnnouncement(params) {
  return await postRequest("hr/announcment", params);
}

export async function serviceGetHRAnnouncementDetails(params) {
  return await postRequest("hr/announcment/detail", params);
}

export async function serviceDeleteHRAnnouncement(params) {
  return await formDataRequest("hr/announcment/delete", params);
}

export async function serviceCheckHRAnnouncement(params) {
  return await postRequest("hr/announcment/check", params);
}
