import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateClaims(params) {
    return await formDataRequest('cr/create', params);
}
export async function serviceUpdateClaims(params) {
    return await postRequest('cr/update', params);
}

export async function serviceDeleteClaims(params) {
    return await postRequest('cr/delete', params);
}
export async function serviceGetClaimsDetails(params) {
    return await postRequest('cr/details', params);
}
export async function serviceGetClaims(params) {
    return await postRequest('cr', params);
}

export async function serviceGetClaimsJobHistory (params) {
    return await postRequest('cr/details/job/history', params);
}

export async function serviceClaimsHistory (params) {
    return await postRequest('cr/events/history', params);
}

export async function serviceGetClaimDetail(params){
    return await getRequest('employee/claims/type',params)
}
