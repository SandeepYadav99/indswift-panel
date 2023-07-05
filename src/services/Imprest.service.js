import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateImprest(params) {
    return await postRequest('imprest/create', params);
}
export async function serviceUpdateImprest(params) {
    return await postRequest('imprest/update', params);
}

export async function serviceCreateImprestPlanner(params) {
    return await formDataRequest('imprest/planner/create', params);
}
export async function serviceDeleteImprest(params) {
    return await postRequest('imprest/delete', params);
}
export async function serviceGetImprestDetails(params) {
    return await postRequest('employee/imprest/details', params);
}
export async function serviceGetImprest(params) {
    return await postRequest('imprest', params);
}
export async function serviceDetailsImprest(params) {
    return await postRequest('imprest/planner/details', params);
}
export async function serviceGetDropdownDetail(params){
    return await postRequest('imprest/tp',params)
}
export async function serviceApproveImprest(params) {
    return await postRequest('imprest/accept', params);
}
export async function serviceRejectImprest(params) {
    return await postRequest('imprest/reject', params);
}
export async function serviceGetAmpountImprest(params) {
    return await postRequest('ib/employee', params);
}
