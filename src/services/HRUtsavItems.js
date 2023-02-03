import { postRequest } from "../libs/AxiosService.util";

export async function serviceFetchUtsavItems(params) {
  return await postRequest("hr/utsav/items", params);
}

export async function serviceCreateUtsavItems(params) {
  return await postRequest("hr/utsav/items/create", params);
}

export async function serviceUpdateUtsavItems(params) {
  return await postRequest("hr/utsav/items/update", params);
}

export async function serviceDeleteUtsavItems(params) {
  return await postRequest("hr/utsav/items/delete", params);
}

export async function serviceUtsavItemsExists(params) {
  return await postRequest("hr/utsav/items/exists", params);
}

export async function serviceUploadUtsavItemsImage(params) {
  return await postRequest("hr/utsav/items/upload/image", params);
}
