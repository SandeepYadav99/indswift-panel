import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateClaimCarReport(params) {
    return await formDataRequest('cr/employee/create', params);
}
export async function serviceUpdateClaimCarReport(params) {
    return await postRequest('cr/employee/update', params);
}
export async function serviceDeleteClaimCarReport(params) {
    return await postRequest('cr/employee/delete', params);
}
export async function serviceGetClaimCarReportDetails(params) {
    return await postRequest('employee/claims/details', params);
}
export async function serviceGetClaimCarReport(params) {
    return await postRequest('employee/claims/reports/car', params);
}
export async function serviceDetailsClaimCarReport(params) {
    return await postRequest('cr/employee/details', params);
}
export async function serviceExportCarClaimReport(params) {
    return await postRequest('employee/claims/reports/car/export', params);
}
