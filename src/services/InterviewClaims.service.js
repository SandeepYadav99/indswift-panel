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

export async function serviceInterviewDetailsCLaim(params) {
    return await postRequest('irfr/details', params);
}
export async function serviceApproveInterviewCLaim(params) {
    return await postRequest('irfr/accept', params);
}
export async function serviceRejectInterviewClaim(params) {
    return await postRequest('irfr/reject', params);
}
export async function serviceExportBankSheetListInterview(params) {
    return await postRequest('candidate/irf/export/bank/transfer', params);
}