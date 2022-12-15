import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateAnnual(params) {
    return await postRequest('annual/create', params);
}

export async function serviceUpdateAnnual(params) {
    return await postRequest('annual/update', params);
}

export async function serviceDeleteAnnual(params) {
    return await postRequest('annual/delete', params);
}

export async function serviceGetAnnual (params) {
    return await postRequest('annual', params);
}

export async function serviceAnnualDetail (params) {
    return await postRequest('annual/detail', params);
}
