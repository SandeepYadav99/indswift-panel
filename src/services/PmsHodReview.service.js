import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsHodReview(params) {
    return await formDataRequest('pms/hod/review/create', params);
}
export async function serviceUpdatePmsHodReview(params) {
    return await postRequest('pms/hod/review/update', params);
}

export async function serviceDeletePmsHodReview(params) {
    return await postRequest('pms/hod/review/delete', params);
}
export async function serviceGetPmsHodReview(params) {
    return await postRequest('pms/hod/my/batches', params);
}


export async function serviceGetHodFormDetail(params) {
    return await postRequest('pms/hod/batch/detail', params);
}

export async function serviceGetHodFormDraft (params) {
    return await postRequest('pms/hod/form/draft', params);
}

export async function serviceAddHodFormDraft (params) {
    return await postRequest('pms/hod/form/draft/save', params);
}

export async function serviceSaveHodReview(params) {
    return await postRequest('pms/hod/form/save', params);
}

export async function serviceGetPMSHodReviewDetail(reviewId) {
    return await postRequest('pms/hod/form/detail', {review_id: reviewId});
}
