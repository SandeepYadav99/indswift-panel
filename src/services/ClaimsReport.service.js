import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateClaimsReport(params) {
    return await formDataRequest('cr/budget/edit/versions/create', params);
}

export async function serviceUpdateClaimsReport(params) {
    return await postRequest('cr/update', params);
}

export async function serviceDeleteClaimsReport(params) {
    return await postRequest('cr/delete', params);
}

export async function serviceGetClaimsReport (params) {
    return await postRequest('employee/claims/reports', params);
}

export async function serviceClaimsReportDetail (params) {
    return await postRequest('cr/budget/detail', params);
}
