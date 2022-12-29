import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateDepartment(params) {
    return await formDataRequest('departments/create', params);
}
export async function serviceUpdateDepartment(params) {
    return await formDataRequest('departments/update', params);
}

export async function serviceGetDepartment(params) {
    return await postRequest('departments', params);
}

export async function serviceGetDepartmentDetails(params) {
    return await postRequest('departments/detail', params);
}

export async function serviceDeleteDepartment(params) {
    return await formDataRequest('departments/delete', params);
}

export async function serviceCheckDepartment(params) {
    return await postRequest('departments/check', params);
}
