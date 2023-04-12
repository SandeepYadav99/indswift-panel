import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCandidate(params) {
    return await formDataRequest('candidates/create', params);
}
export async function serviceUpdateCandidate(params) {
    return await formDataRequest('candidates/update', params);
}

export async function serviceCandidateEditData(params) {
    return await postRequest('candidates/edit/data', params);
}

export async function serviceDeleteCandidate(params) {
    return await postRequest('candidates/delete', params);
}
export async function serviceGetCandidateDetails(params) {
    return await postRequest('candidates/details', params);
}
export async function serviceGetCandidate(params) {
    return await postRequest('candidates', params);
}

export async function serviceGetCandidateJobHistory (params) {
    return await postRequest('candidates/details/job/history', params);
}

export async function serviceCandidateHistory (params) {
    return await postRequest('candidates/events/history', params);
}

export async function serviceCreateCandidateOfferLetter (params) {
    return await postRequest('candidates/offer/letter/create', params);
}

export async function serviceGetCandidateOfferLetter(params) {
    return await postRequest('candidates/offer/letter/form/details', params);
}

export async function serviceGetCandidatePRCS(params) {
    return await postRequest('candidates/prcs', params);
}

export async function serviceUpdateCandidateStatus(params) {
    return await postRequest('candidates/drop/status', params);
}
