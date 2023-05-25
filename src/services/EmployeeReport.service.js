import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateEmployeeReport(params) {
    return await formDataRequest('employee/report/budget/edit/versions/create', params);
}

export async function serviceUpdateEmployeeReport(params) {
    return await postRequest('employee/report/update', params);
}

export async function serviceDeleteEmployeeReport(params) {
    return await postRequest('employee/report/delete', params);
}

export async function serviceGetEmployeeReport (params) {
    return await postRequest('employees/connection/reports', params);
}

export async function serviceEmployeeReportDetail (params) {
    return await postRequest('employee/report/budget/detail', params);
}

export async function serviceGetDetailTrans (params) {
    return await postRequest('employee/report/budget/transections', params);
}