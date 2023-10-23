import { postRequest } from "../libs/AxiosService.util";


export async function serviceLeaveCreate(params){
    return await postRequest("leaves/create", params);
}