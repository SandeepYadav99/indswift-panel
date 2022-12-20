import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCadre(params) {
    return await formDataRequest('cadre/create', params);
}
export async function serviceUpdateCadre(params) {
    return await formDataRequest('cadre/update', params);
}

export async function serviceGetCadre(params) {
    return await postRequest('cadre', params);
}

export async function serviceDeleteCadre(params) {
    return await formDataRequest('cadre/delete', params);
}

export async function serviceGetCadresList() {
    return await getRequest('cadre/list', {});
}
