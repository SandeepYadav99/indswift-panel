import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePMSSitePendingReview(params) {
    return await formDataRequest('pms/site/review/create', params);
}
export async function serviceUpdatePMSSitePendingReview(params) {
    return await postRequest('pms/site/review/update', params);
}

export async function serviceDeletePMSSitePendingReview(params) {
    return await postRequest('pms/site/review/delete', params);
}
export async function serviceGetPMSSitePendingReview(params) {
    return await postRequest('pms/site/my/batches', params);
}

export async function serviceGetSiteFormDetail(params) {
    return await postRequest('pms/site/batch/detail', params);
}

export async function serviceGetSiteFormDraft (params) {
    return await postRequest('pms/site/form/draft', params);
}

export async function serviceAddSiteFormDraft (params) {
    return await postRequest('pms/site/form/draft/save', params);
}

export async function serviceSaveSiteReview(params) {
    return await postRequest('pms/site/form/save', params);
}

export async function serviceGetPMSSitePendingReviewDetail(reviewId) {
    return await postRequest('pms/site/form/detail', {review_id: reviewId});
}
