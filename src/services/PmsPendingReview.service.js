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

export async function serviceGetMyPlannerForm(params) {
    return await postRequest('pms/my/planner/form/detail', params);
}

export async function serviceGet4BDraft (params) {
    return await postRequest('pms/4b/form/draft', params);
}

export async function serviceAdd4BDraft (params) {
    return await postRequest('pms/4b/form/draft/save', params);
}

export async function serviceSave4BReview(params) {
    return await postRequest('pms/4b/form/save', params);
}

export async function serviceGetPMS4BReviewDetail(reviewId) {
    return await postRequest('pms/4b/form/detail', {review_id: reviewId});
}
