/**
 * Created by charnjeetelectrovese@gmail.com on 4/8/2020.
 */
import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateJobRoles(params) {
    return await formDataRequest('job/roles/create', params);
}

export async function serviceUpdateJobRoles(params) {
    return await formDataRequest('job/roles/update', params);
}

export async function serviceDeleteJobRoles(params) {
    return await formDataRequest('job/roles/delete', params);
}


export async function serviceGetJobRoles (params) {
    return await postRequest('job/roles', params);
}

export async function serviceJobRolesCodeCheck (params) {
    return await postRequest('job/roles/code/exists', params);
}

export async function serviceJobRolesVariantCheck (params) {
    return await postRequest('job/roles/variants/exists', params);
}

export async function serviceJobRolesDetails (params) {
    return await postRequest('job/roles/detail', params);
}
