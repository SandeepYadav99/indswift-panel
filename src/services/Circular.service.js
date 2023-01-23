import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCircular(params) {
    return await formDataRequest('hr/circulars/create', params);
}
export async function serviceUpdateCircular(params) {
    return await formDataRequest('hr/circulars/update', params);
}

export async function serviceGetCircular(params) {
    return await postRequest('hr/circulars', params);
}

export async function serviceGetCircularDetails(params) {
    return await postRequest('hr/circulars/detail', params);
}

export async function serviceDeleteCircular(params) {
    return await formDataRequest('hr/circulars/delete', params);
}

export async function serviceCheckCircular(params) {
    return await postRequest('hr/circulars/check', params);
}
