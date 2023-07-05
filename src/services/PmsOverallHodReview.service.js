import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsOverallHodReview(params) {
    return await formDataRequest('pms/overall/hod/review/create', params);
}
export async function serviceUpdatePmsOverallHodReview(params) {
    return await postRequest('pms/overall/hod/review/update', params);
}

export async function serviceDeletePmsOverallHodReview(params) {
    return await postRequest('pms/overall/hod/review/delete', params);
}
export async function serviceGetPmsOverallHodReview(params) {
    return await postRequest('pms/overall/hod/my/batches', params);
}


export async function serviceGetHodFormDetail(params) {
    return await postRequest('pms/overall/hod/batch/detail', params);
}

export async function serviceGetHodFormDraft (params) {
    return await postRequest('pms/overall/hod/form/draft', params);
}

export async function serviceAddHodFormDraft (params) {
    return await postRequest('pms/overall/hod/form/draft/save', params);
}

export async function serviceSaveHodReview(params) {
    return await postRequest('pms/overall/hod/form/save', params);
}

export async function serviceGetPMSHodReviewDetail(reviewId) {
    return await postRequest('pms/overall/hod/form/detail', {review_id: reviewId});
}
