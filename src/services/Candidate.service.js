import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCandidate(params) {
    return await formDataRequest('candidates/create', params);
}
export async function serviceUpdateCandidate(params) {
    return await postRequest('candidates/update', params);
}

export async function serviceDeleteCandidate(params) {
    return await postRequest('candidates/delete', params);
}

export async function serviceGetCandidate(params) {
    return await postRequest('candidates', params);
}

export async function serviceCandidateCheck (params) {
    return await postRequest('candidates/check', params);
}
