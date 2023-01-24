/**
 * Created by charnjeetelectrovese@gmail.com on 1/1/2020.
 */
import {postRequest} from '../libs/AxiosService.util';


export async function serviceFetchFacilities(params) {
    return await postRequest('hr/facilities', params);
}

export async function serviceCreateFacility(params) {
    return await postRequest('hr/facilities/create', params);
}

export async function serviceUpdateFacility(params) {
    return await postRequest('hr/facilities/update', params);
}

export async function serviceDeleteFacility(params) {
    return await postRequest('hr/facilities/delete', params);
}

export async function serviceFacilityExists(params) {
    return await postRequest('hr/facilities/exists', params);
}

