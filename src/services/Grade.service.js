import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateGrade(params) {
    return await formDataRequest('grades/create', params);
}
export async function serviceUpdateGrade(params) {
    return await formDataRequest('grades/update', params);
}

export async function serviceGetGrade(params) {
    return await postRequest('grades', params);
}

export async function serviceGetGradeDetails(params) {
    return await postRequest('grades/detail', params);
}

export async function serviceCheckGradeCode(params) {
    return await postRequest('grades/check', params);
}

export async function serviceDeleteGrade(params) {
    return await formDataRequest('grades/delete', params);
}
