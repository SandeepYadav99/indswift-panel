import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';



export async function serviceCreateCities(params) {
    return await formDataRequest('cities/create', params);
}

export async function serviceUpdateCities(params) {
    return await formDataRequest('cities/update', params);
}

export async function serviceFetchCities(params) {
    return await postRequest('cities', params);
}

export async function serviceCityExists(params) {
    return await postRequest('cities/exists', params);
}

export async function serviceFetchCountrieslist() {
    return await postRequest('list/custom',{list:['COUNTRY']});
}
