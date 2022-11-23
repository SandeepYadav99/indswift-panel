import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';



export async function serviceCreateCountries(params) {
    return await formDataRequest('countries/create', params);
}

export async function serviceUpdateCountries(params) {
    return await formDataRequest('countries/update', params);
}

export async function serviceFetchCountries(params) {
    return await postRequest('countries', params);
}
export async function serviceCheckCountry(params) {
    return await postRequest('countries/check', params);
}
