import {formDataRequest, postRequest} from "../libs/AxiosService.util";


export async function serviceCandidateEafUpdatePersonal(params) {
    return await formDataRequest('candidate/eaf/update/personal', params);
}

export async function serviceCandidateEAFUpdateQualification (params) {
    return await postRequest('candidate/eaf/update/qualification', params);
}

export async function serviceCandidateEAFUpdateEmployment (params) {
    return await postRequest('candidate/eaf/update/employment', params);
}

export async function serviceGetCandidateEafPersonalDetails(params) {
    return await postRequest('candidate/eaf/get/personal', params);
}

export async function serviceGetCandidateEAFQualification (params) {
    return await postRequest('candidate/eaf/get/qualification', params);
}

export async function serviceGetCandidateEAFEmployment (params) {
    return await postRequest('candidate/eaf/get/employment', params);
}

export async function serviceLoginCandidateEaf (params) {
    return await postRequest('candidate/eaf/authenticate', params);
}
export async function serviceGetCandidateEAFDetails (params) {
    return await postRequest('candidates/eaf/details', params);
}
