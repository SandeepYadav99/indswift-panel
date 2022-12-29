import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCadre(params) {
    return await formDataRequest('cadres/create', params);
}
export async function serviceUpdateCadre(params) {
    return await formDataRequest('cadres/update', params);
}

export async function serviceGetCadre(params) {
    return await postRequest('cadres', params);
}

export async function serviceGetCadreDetails(params) {
    return await postRequest('cadres/detail', params);
}

export async function serviceDeleteCadre(params) {
    return await formDataRequest('cadres/delete', params);
}
