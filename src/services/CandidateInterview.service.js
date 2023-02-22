import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCandidateInterview(params) {
    return await formDataRequest('tm/create', params);
}
export async function serviceUpdateCandidateInterview(params) {
    return await postRequest('tm/update', params);
}

export async function serviceDeleteCandidateInterview(params) {
    return await postRequest('tm/delete', params);
}
export async function serviceGetCandidateInterviewDetails(params) {
    return await postRequest('tm/details', params);
}
export async function serviceGetCandidateInterview(params) {
    return await postRequest('tm', params);
}

export async function serviceCandidateInterviewCheck (params) {
    return await postRequest('tm/check', params);
}
