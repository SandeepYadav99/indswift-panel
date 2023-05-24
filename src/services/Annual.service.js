import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateAnnual(params) {
    return await formDataRequest('annual/budget/edit/versions/create', params);
}

export async function serviceUpdateAnnual(params) {
    return await postRequest('annual/update', params);
}

export async function serviceDeleteAnnual(params) {
    return await postRequest('annual/delete', params);
}

export async function serviceGetAnnual (params) {
    return await postRequest('annual/budget', params);
}

export async function serviceAnnualDetail (params) {
    return await postRequest('annual/budget/detail', params);
}

export async function serviceGetDetailTrans (params) {
    return await postRequest('annual/budget/transections', params);
}