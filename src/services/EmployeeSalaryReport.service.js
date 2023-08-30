import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateEmployeeSalaryReport(params) {
    return await formDataRequest('employee/report/budget/edit/versions/create', params);
}

export async function serviceUpdateEmployeeSalaryReport(params) {
    return await postRequest('employee/report/update', params);
}

export async function serviceDeleteEmployeeSalaryReport(params) {
    return await postRequest('employee/report/delete', params);
}

export async function serviceGetEmployeeSalaryReport (params) {
    return await postRequest('employee/salary/transactions/comparision/report', params);
}
export async function serviceGetPmsEmployeeSalaryReport (params) {
    return await postRequest('comparison/report/pms', params);
}
export async function serviceEmployeeSalaryReportDetail (params) {
    return await postRequest('employee/report/budget/detail', params);
}
export async function serviceEmployeeSalaryReportExcelDownload (params) {
    return await postRequest('employee/salary/transactions/comparision/report/excel', params);
}