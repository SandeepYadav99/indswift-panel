import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateDepartment(params) {
    return await formDataRequest('department/create', params);
}
export async function serviceUpdateDepartment(params) {
    return await formDataRequest('department/update', params);
}

export async function serviceGetDepartment(params) {
    return await postRequest('department', params);
}

export async function serviceDeleteDepartment(params) {
    return await formDataRequest('department/delete', params);
}

export async function serviceGetDepartmentsList() {
    return await getRequest('department/list', {});
}
