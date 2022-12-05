import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateSubDepartment(params) {
    return await formDataRequest('subdepartment/create', params);
}
export async function serviceUpdateSubDepartment(params) {
    return await formDataRequest('subdepartment/update', params);
}

export async function serviceGetSubDepartment(params) {
    return await postRequest('subdepartment', params);
}

export async function serviceDeleteSubDepartment(params) {
    return await formDataRequest('subdepartment/delete', params);
}

export async function serviceGetSubDepartmentsList() {
    return await getRequest('subdepartment/list', {});
}
