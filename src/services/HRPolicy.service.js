import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateHRPolicy(params) {
    return await formDataRequest('hr/create', params);
}
export async function serviceUpdateHRPolicy(params) {
    return await formDataRequest('hr/update', params);
}

export async function serviceGetHRPolicy(params) {
    return await postRequest('hr', params);
}

export async function serviceGetHRPolicyDetails(params) {
    return await postRequest('hr/detail', params);
}

export async function serviceDeleteHRPolicy(params) {
    return await formDataRequest('hr/delete', params);
}

export async function serviceCheckHRPolicy(params) {
    return await postRequest('hr/check', params);
}
