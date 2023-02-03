/**
 * Created by charnjeetelectrovese@gmail.com on 1/1/2020.
 */
import { postRequest } from "../libs/AxiosService.util";

export async function serviceFetchUtsav(params) {
  return await postRequest("hr/utsav", params);
}

export async function serviceCreateUtsav(params) {
  return await postRequest("hr/utsav/create", params);
}

export async function serviceUpdateUtsav(params) {
  return await postRequest("hr/utsav/update", params);
}

export async function serviceDeleteUtsav(params) {
  return await postRequest("hr/utsav/delete", params);
}

export async function serviceUtsavExists(params) {
  return await postRequest("hr/utsav/exists", params);
}
