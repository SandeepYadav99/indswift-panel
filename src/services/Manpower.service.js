import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateManpower(params) {
    return await postRequest('manpower/create', params);
}

export async function serviceUpdateManpower(params) {
    return await postRequest('manpower/update', params);
}

export async function serviceDeleteManpower(params) {
    return await postRequest('manpower/delete', params);
}

export async function serviceGetManpower (params) {
    return await postRequest('manpower', params);
}

export async function serviceManpowerDetail (params) {
    return await postRequest('manpower/detail', params);
}
