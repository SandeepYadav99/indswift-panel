import { getRequest } from "../libs/AxiosService.util";

export async function serviceGetEmployeeKnowledge(params) {
  return await getRequest("/hr/knowledge/list", params);
}
