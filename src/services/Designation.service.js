import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateDesignation(params) {
    return await formDataRequest('designation/create', params);
}
export async function serviceUpdateDesignation(params) {
    return await formDataRequest('designation/update', params);
}

export async function serviceGetDesignation(params) {
    return await postRequest('designation', params);
}

export async function serviceGetDesignationDetails(params) {
    return await postRequest('designation/detail', params);
}

export async function serviceDeleteDesignation(params) {
    return await formDataRequest('designation/delete', params);
}

export async function serviceCheckDesignation(params) {
    return await postRequest('designation/check', params);
}
