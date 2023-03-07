import { postRequest } from "../libs/AxiosService.util";

export async function serviceGetCVShortlistCandidates(params) {
    return await postRequest("cv/shortlists/candidates", params);
}

export async function serviceUpdateCVShortlistRequest(params) {
    return await postRequest('cv/shortlists/update', params);
}
