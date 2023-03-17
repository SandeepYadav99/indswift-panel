import { postRequest} from "../libs/AxiosService.util";



export async function serviceAddCandidateFeedback(params) {
    return await postRequest('candidate/feedback/add', params);
}

export async function serviceCandidateFeedbackDetails(params) {
    return await postRequest('candidate/feedback/details', params);
}
