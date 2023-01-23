import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateHRPolicy(params) {
    return await formDataRequest('hr/policies/create', params);
}
export async function serviceUpdateHRPolicy(params) {
    return await formDataRequest('hr/policies/update', params);
}

export async function serviceGetHRPolicy(params) {
    return await postRequest('hr/policies', params);
}

export async function serviceGetHRPolicyDetails(params) {
    return await postRequest('hr/policies/detail', params);
}

export async function serviceDeleteHRPolicy(params) {
    return await formDataRequest('hr/policies/delete', params);
}

export async function serviceCheckHRPolicy(params) {
    return await postRequest('hr/policies/check', params);
}
