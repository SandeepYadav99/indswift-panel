import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';



export async function serviceCreateCurrency(params) {
    return await formDataRequest('currency/create', params);
}

export async function serviceUpdateCurrency(params) {
    return await formDataRequest('currency/update', params);
}

export async function serviceFetchCurrency(params) {
    return await postRequest('currency', params);
}
export async function serviceCurrencyExists(params) {
    return await postRequest('currency/exists', params);
}
export async function serviceDeleteCurrency(params) {
    return await postRequest('currency/delete', params);
}

