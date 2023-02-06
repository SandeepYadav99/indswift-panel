import { postRequest } from "../libs/AxiosService.util";

export async function serviceCreateReview(params) {
  return await postRequest("review/create", params);
}
export async function serviceGetReviewDetails(params) {
  return await postRequest("review/detail", params);
}

export async function serviceUpdateReview(params) {
  return await postRequest("review/update", params);
}

export async function serviceDeleteReview(params) {
  return await postRequest("review/delete", params);
}

export async function serviceGetReview(params) {
  return await postRequest("review", params);
}

export async function serviceReviewCheck(params) {
  return await postRequest("review/check", params);
}

export async function serviceReviewUpdateHead(params) {
  return await postRequest("review/update/head", params);
}

export async function serviceReviewDepartmentUpdate(params) {
  return await postRequest("review/update/departments", params);
}

export async function serviceReviewDepartments(params) {
  return await postRequest("review/departments", params);
}
