import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateEmployeeImprest(params) {
    return await formDataRequest('ib/edit/versions/employeeeimprest', params);
}

export async function serviceUpdateEmployeeImprest(params) {
    return await postRequest('ib/update', params);
}

export async function serviceDeleteEmployeeImprest(params) {
    return await postRequest('ib/delete', params);
}

export async function serviceGetEmployeeImprest (params) {
    return await postRequest('ib', params);
}

export async function serviceEmployeeImprestDetail (params) {
    return await postRequest('ib/detail', params);
}
export async function serviceExportEmployeeImprest(params) {
    return await postRequest('employee/claims/reports/export', params);
}