/**
 * Created by charnjeetelectrovese@gmail.com on 1/1/2020.
 */
import {postRequest} from '../libs/AxiosService.util';


export async function serviceFetchFacilityItems(params) {
    return await postRequest('hr/facilities/items', params);
}

export async function serviceCreateFacilityItem(params) {
    return await postRequest('hr/facilities/items/create', params);
}

export async function serviceUpdateFacilityItem(params) {
    return await postRequest('hr/facilities/items/update', params);
}

export async function serviceDeleteFacilityItem(params) {
    return await postRequest('hr/facilities/items/delete', params);
}

export async function serviceFacilityItemExists(params) {
    return await postRequest('hr/facilities/items/exists', params);
}

export async function serviceUploadFacilityItemImage(params) {
    return await postRequest('hr/facilities/items/upload/image', params);
}
