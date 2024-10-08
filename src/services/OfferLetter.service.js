import {postRequest} from "../libs/AxiosService.util";


export async function serviceGetOfferLetterDetails(params) {
    return await postRequest('candidates/offer/letter/details', params);
}

export async function serviceGetOLRPanelist(params) {
    return await postRequest('candidates/offer/letter/panelist', params);
}

export async function serviceSubmitOfferStatus(params) {
    return await postRequest('candidates/offer/letter/update/status', params);
}
export async function serviceGetPanelistDetails(params) {
    return await postRequest('olr/panelists', params);
}

export async function serviceOfferLetterShareCandidate(params) {
    return await postRequest('candidates/offer/letter/share', params);
}
