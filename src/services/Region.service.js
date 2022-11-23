import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateRegion(params) {
    return await formDataRequest('regions/create', params);
}

export async function serviceUpdateRegion(params) {
    return await formDataRequest('regions/update', params);
}

export async function serviceDeleteRegion(params) {
    return await formDataRequest('regions/delete', params);
}

export async function serviceGetRegion (params) {
    return await postRequest('regions', params);
}

export async function serviceGetRegionList (params) {
    return await getRequest('regions', params);
}

export async function serviceRegionCheck (params) {
    return await postRequest('region/check', params);
}
