import {formDataRequest, postRequest} from "../libs/AxiosService.util";



export async function serviceAddCandidateFeedback(params) {
    return await postRequest('candidate/feedback/add', params);
}
