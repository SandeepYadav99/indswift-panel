import {postRequest} from "../libs/AxiosService.util";



export async function serviceAuthenticateCandidateOfferLetter(params) {
    return await postRequest('candidate/offer/letter/authenticate', params);
}

export async function serviceGetCandidateOfferLetter(params) {
    return await postRequest('candidate/offer/letter', params);
}

export async function serviceCandidateOfferLetterReject(params) {
    return await postRequest('candidate/offer/letter/reject', params);
}

export async function serviceCandidateOfferLetterAccept(params) {
    return await postRequest('candidate/offer/letter/accept', params);
}
