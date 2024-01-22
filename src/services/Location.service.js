import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateLocation(params) {
    return await postRequest('locations/create', params);
}
export async function serviceGetLocationDetails(params) {
    return await postRequest('locations/detail', params);
}

export async function serviceUpdateLocation(params) {
    return await postRequest('locations/update', params);
}

export async function serviceDeleteLocation(params) {
    return await postRequest('locations/delete', params);
}

export async function serviceGetLocation(params) {
    return await postRequest('locations', params);
}

export async function serviceLocationCheck (params) {
    return await postRequest('locations/check', params);
}

export async function serviceLocationUpdateHead(params) {
    return await postRequest('locations/update/head', params);
}

export async function serviceLocationDepartmentUpdate(params) {
    return await postRequest('locations/update/departments', params);
}

export async function serviceLocationDepartments(params) {
    return await postRequest('locations/departments', params);
}
export async function serviceLocationClaimDepartments(params) {
    return await postRequest('locations/claim/panelists', params);
}
export async function serviceLocationClaimUpdate(params) {
    return await postRequest('locations/update/claim/panelists', params);
}
export async function serviceLocationRoleUpdate(params) {
    return await postRequest('locations/update/roles', params);
}
export async function serviceLocationRoleDepartments(params) {
    return await postRequest('locations/roles', params);
}
export async function serviceLocationOlrUpdate(params) {
    return await postRequest('locations/update/olr/panelists', params);
}
export async function serviceGetLocationOlr(params) {
    return await postRequest('locations/olr/panelists', params);
}