import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateImprestApproval(params) {
    return await formDataRequest('ir/employee', params);
}
export async function serviceUpdateImprestApproval(params) {
    return await postRequest('ir/employee/update', params);
}
export async function serviceDeleteImprestApproval(params) {
    return await postRequest('ir/employee/delete', params);
}
export async function serviceGetImprestApprovalDetails(params) {
    return await postRequest('employee/claims/details', params);
}
export async function serviceGetImprestApproval(params) {
    return await postRequest('ir', params);
}
export async function serviceDetailsImprestApproval(params) {
    return await postRequest('ir/details', params);
}
export async function serviceGetImprestApprovalTable(params) {
    return await postRequest('ilt', params);
}
export async function serviceExportCarClaimReport(params) {
    return await postRequest('employee/claims/reports/car/export', params);
}
export async function serviceApproveImprestApproval(params) {
    return await postRequest('ir/accept', params);
}
export async function serviceRejectImprestApproval(params) {
    return await postRequest('ir/reject', params);
}