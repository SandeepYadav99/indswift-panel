import { postRequest } from "../libs/AxiosService.util";

export async function serviceCreateReview(params) {
  return await postRequest("cv/shortlists/prc/create", params);
}
export async function serviceGetReviewDetails(params) {
  return await postRequest("cv/shortlists/prc/detail", params);
}

export async function serviceUpdateReview(params) {
  return await postRequest("cv/shortlists/prc/update", params);
}

export async function serviceDeleteReview(params) {
  return await postRequest("cv/shortlists/prc/delete", params);
}

export async function serviceGetReview(params) {
  return await postRequest("cv/shortlists/prc", params);
}

export async function serviceReviewCheck(params) {
  return await postRequest("cv/shortlists/prc/check", params);
}

export async function serviceReviewUpdateHead(params) {
  return await postRequest("cv/shortlists/prc/update/head", params);
}

export async function serviceReviewDepartmentUpdate(params) {
  return await postRequest("cv/shortlists/prc/update/departments", params);
}

export async function serviceReviewDepartments(params) {
  return await postRequest("cv/shortlists/prc/departments", params);
}
