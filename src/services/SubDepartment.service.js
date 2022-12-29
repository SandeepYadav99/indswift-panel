import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateSubDepartment(params) {
    return await formDataRequest('departments/subs/create', params);
}
export async function serviceUpdateSubDepartment(params) {
    return await formDataRequest('departments/subs/update', params);
}

export async function serviceGetSubDepartment(params) {
    return await postRequest('departments/subs', params);
}

export async function serviceGetSubDepartmentDetail(params) {
    return await postRequest('departments/subs/detail', params);
}

export async function serviceCheckSubCategory(params) {
    return await postRequest('departments/subs/check', params);
}

export async function serviceDeleteSubDepartment(params) {
    return await formDataRequest('departments/subs/delete', params);
}
