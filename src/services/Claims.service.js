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
    return await postRequest('employee/claims/details', params);
}
export async function serviceGetClaims(params) {
    return await postRequest('cr', params);
}
export async function serviceDetailsCLaim(params) {
    return await postRequest('cr/details', params);
}
export async function serviceGetClaimDetail(params){
    return await getRequest('employee/claims/type',params)
}
export async function serviceApproveCLaim(params) {
    return await postRequest('cr/accept', params);
}
export async function serviceRejectCLaim(params) {
    return await postRequest('cr/reject', params);
}
export async function serviceExportClaimList(params) {
    return await postRequest('employee/claims/export', params);
}
export async function serviceExportBankSheetList(params) {
    return await postRequest('employee/claims/export/bank/transfer', params);
}
export async function serviceEmployeeClaimDetails(params) {
    return await postRequest('employee/claims/details', params);
}

