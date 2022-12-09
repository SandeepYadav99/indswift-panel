import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCandidate(params) {
    return await postRequest('candidate/create', params);
}
export async function serviceUpdateCandidate(params) {
    return await postRequest('candidate/update', params);
}

export async function serviceDeleteCandidate(params) {
    return await postRequest('candidate/delete', params);
}

export async function serviceGetCandidate(params) {
    return await postRequest('candidate', params);
}

export async function serviceCandidateCheck (params) {
    return await postRequest('candidate/check', params);
}
