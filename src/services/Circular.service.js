import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCircular(params) {
    return await formDataRequest('circular/create', params);
}
export async function serviceUpdateCircular(params) {
    return await formDataRequest('circular/update', params);
}

export async function serviceGetCircular(params) {
    return await postRequest('circular', params);
}

export async function serviceGetCircularDetails(params) {
    return await postRequest('circular/detail', params);
}

export async function serviceDeleteCircular(params) {
    return await formDataRequest('circular/delete', params);
}

export async function serviceCheckCircular(params) {
    return await postRequest('circular/check', params);
}
