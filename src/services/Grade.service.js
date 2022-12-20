import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateGrade(params) {
    return await formDataRequest('grade/create', params);
}
export async function serviceUpdateGrade(params) {
    return await formDataRequest('grade/update', params);
}

export async function serviceGetGrade(params) {
    return await postRequest('grade', params);
}

export async function serviceDeleteGrade(params) {
    return await formDataRequest('grade/delete', params);
}

export async function serviceGetGradesList() {
    return await getRequest('grade/list', {});
}
