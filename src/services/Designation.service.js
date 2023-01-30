import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateDesignation(params) {
    return await formDataRequest('designations/create', params);
}
export async function serviceUpdateDesignation(params) {
    return await formDataRequest('designations/update', params);
}

export async function serviceGetDesignation(params) {
    return await postRequest('designations', params);
}

export async function serviceGetDesignationDetails(params) {
    return await postRequest('designations/detail', params);
}

export async function serviceDeleteDesignation(params) {
    return await formDataRequest('designations/delete', params);
}

export async function serviceCheckDesignation(params) {
    return await postRequest('designations/check', params);
}
