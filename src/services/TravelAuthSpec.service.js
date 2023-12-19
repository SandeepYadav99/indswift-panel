import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateTravelAuthSpec(params) {
  return await formDataRequest("travel/auth/rate", params);
}
export async function serviceUpdateTravelAuthSpec(params) {
  return await postRequest("travel/auth/update", params);
}

export async function serviceDeleteTravelAuthSpec(params) {
  return await postRequest("travel/auth/delete", params);
}

export async function serviceGetTravelAuthSpec(params) {
  return await postRequest("tpr/all", params);
}
