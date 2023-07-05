import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateManpower(params) {
    return await postRequest('annual/budget/manpower/create', params);
}

export async function serviceUpdateManpower(params) {
    return await postRequest('annual/budget/manpower/update', params);
}

export async function serviceDeleteManpower(params) {
    return await postRequest('annual/budget/manpower/delete', params);
}

export async function serviceGetManpower (params) {
    return await postRequest('annual/budget/manpower', params);
}

export async function serviceManpowerDetail (params) {
    return await postRequest('annual/budget/manpower/detail', params);
}
