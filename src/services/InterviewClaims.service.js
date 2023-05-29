import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateInterviewClaims(params) {
    return await formDataRequest('irfr/irfreate', params);
}
export async function serviceUpdateInterviewClaims(params) {
    return await postRequest('irfr/update', params);
}

export async function serviceDeleteInterviewClaims(params) {
    return await postRequest('irfr/delete', params);
}
export async function serviceGetInterviewClaimsDetails(params) {
    return await postRequest('employee/claims/details', params);
}
export async function serviceGetInterviewClaims(params) {
    return await postRequest('irfr', params);
}
export async function serviceDetailsInterviewClaim(params) {
    return await postRequest('irfr/details', params);
}


