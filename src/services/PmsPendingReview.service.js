import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsPendingReview(params) {
    return await formDataRequest('pms/pending/review/create', params);
}
export async function serviceUpdatePmsPendingReview(params) {
    return await postRequest('pms/pending/review/update', params);
}

export async function serviceDeletePmsPendingReview(params) {
    return await postRequest('pms/pending/review/delete', params);
}
export async function serviceGetPmsPendingReview(params) {
    return await postRequest('pms/my/planner', params);
}

