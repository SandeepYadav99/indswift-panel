import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateHRKnowledge(params) {
  return await formDataRequest("hr/knowledge/create", params);
}
export async function serviceUpdateHRKnowledge(params) {
  return await formDataRequest("hr/knowledge/update", params);
}

export async function serviceGetHRKnowledge(params) {
  return await postRequest("hr/knowledge", params);
}

export async function serviceGetHRKnowledgeDetails(params) {
  return await postRequest("hr/knowledge/detail", params);
}

export async function serviceDeleteHRKnowledge(params) {
  return await formDataRequest("hr/knowledge/delete", params);
}

export async function serviceCheckHRKnowledge(params) {
  return await postRequest("hr/knowledge/check", params);
}
