import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateLocation(params) {
    return await postRequest('location/create', params);
}
export async function serviceUpdateLocation(params) {
    return await postRequest('location/update', params);
}

export async function serviceDeleteLocation(params) {
    return await postRequest('location/delete', params);
}

export async function serviceGetLocation(params) {
    return await postRequest('location', params);
}

export async function serviceLocationCheck (params) {
    return await postRequest('location/check', params);
}
