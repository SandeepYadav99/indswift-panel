import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateReviewOLR(params) {
    return await formDataRequest('review/olr/create', params);
}
export async function serviceUpdateReviewOLR(params) {
    return await postRequest('review/olr/update', params);
}

export async function serviceDeleteReviewOLR(params) {
    return await postRequest('review/olr/delete', params);
}
export async function serviceGetReviewOLRDetails(params) {
    return await postRequest('review/olr/detail', params);
}
export async function serviceGetReviewOLR(params) {
    return await postRequest('review/olr', params);
}

export async function serviceReviewOLRCheck (params) {
    return await postRequest('review/olr/check', params);
}
