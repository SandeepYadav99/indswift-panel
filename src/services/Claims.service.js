import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateClaims(params) {
    return await formDataRequest('claims/create', params);
}
export async function serviceUpdateClaims(params) {
    return await postRequest('claims/update', params);
}

export async function serviceDeleteClaims(params) {
    return await postRequest('claims/delete', params);
}
export async function serviceGetClaimsDetails(params) {
    return await postRequest('claims/details', params);
}
export async function serviceGetClaims(params) {
    return await postRequest('claims', params);
}

export async function serviceGetClaimsJobHistory (params) {
    return await postRequest('claims/details/job/history', params);
}

export async function serviceClaimsHistory (params) {
    return await postRequest('claims/events/history', params);
}

