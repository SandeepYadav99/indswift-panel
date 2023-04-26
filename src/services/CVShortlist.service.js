import { postRequest } from "../libs/AxiosService.util";

export async function serviceGetCVShortlistCandidates(params) {
    return await postRequest("cv/shortlists/candidates", params);
}

export async function serviceUpdateCVShortlistRequest(params) {
    return await postRequest('cv/shortlists/update', params);
}

export async function serviceSendCVShortlistReminder(params) {
    return await postRequest('cv/shortlists/send/reminder', params);
}
export async function serviceSendFeedbackReminder(params) {
    return await postRequest('candidate/feedback/reminder', params);
}
export async function serviceSendOlrReminder(params) {
    return await postRequest('olr/review/reminder', params);
}
