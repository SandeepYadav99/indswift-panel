import {formDataRequest, getRequest, postRequest} from "../libs/AxiosService.util";


export async function serviceCreatePmsBatchAdmin(params) {
    return await postRequest('pms/master/create/batch', params);
}

export async function serviceGetPmsList(params) {
    return await postRequest('pms/master', params);
}
export async function serviceCreatePmsBatchType(params) {
    return await postRequest('pms/master/create/batch/type', params);
}
export async function servicePmsBatchFreeze(params) {
    return await postRequest('pms/master/freeze/batch/type', params);
}
export async function servicePmsBatchNormalize(params) {
    return await postRequest('pms/master/normalize/batch/type', params);
}
export async function servicePmsBatchClose(params) {
    return await postRequest('pms/master/close/batch', params);
}


