import { getRequest, postRequest } from "../libs/AxiosService.util";

 
export async function serviceGetUtsavDetails(params) {
  return await postRequest('hr/utsavs/list', params);
}
export async function serviceGetUtsavDetailsInfo(params) {
  console.log("inner?",{params})
  return await postRequest('hr/utsavs/items/detail', params);
}