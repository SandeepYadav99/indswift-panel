import {formDataRequest, postRequest} from "../libs/AxiosService.util";

export async function serviceFetchUtsavItems(params) {
  return await postRequest("hr/utsavs/items", params);
}

export async function serviceCreateUtsavItems(params) {
  return await formDataRequest("hr/utsavs/items/create", params);
}

export async function serviceUpdateUtsavItems(params) {
  return await formDataRequest("hr/utsavs/items/update", params);
}

export async function serviceDeleteUtsavItems(params) {
  return await postRequest("hr/utsavs/items/delete", params);
}

export async function serviceUtsavItemsExists(params) {
  return await postRequest("hr/utsavs/items/exists", params);
}

export async function serviceUploadUtsavItemsImage(params) {
  return await postRequest("hr/utsavs/items/upload/image", params);
}
