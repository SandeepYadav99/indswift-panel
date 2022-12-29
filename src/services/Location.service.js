import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateLocation(params) {
    return await postRequest('locations/create', params);
}
export async function serviceGetLocationDetails(params) {
    return await postRequest('locations/detail', params);
}

export async function serviceUpdateLocation(params) {
    return await postRequest('locations/update', params);
}

export async function serviceDeleteLocation(params) {
    return await postRequest('locations/delete', params);
}

export async function serviceGetLocation(params) {
    return await postRequest('locations', params);
}

export async function serviceLocationCheck (params) {
    return await postRequest('locations/check', params);
}
