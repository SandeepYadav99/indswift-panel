import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateReviewOLR(params) {
    return await formDataRequest('olr/create', params);
}
export async function serviceUpdateReviewOLR(params) {
    return await postRequest('olr/update', params);
}

export async function serviceDeleteReviewOLR(params) {
    return await postRequest('olr/delete', params);
}
export async function serviceGetReviewOLRDetails(params) {
    return await postRequest('olr/detail', params);
}
export async function serviceGetReviewOLR(params) {
    return await postRequest('olr', params);
}

export async function serviceReviewOLRCheck (params) {
    return await postRequest('olr/check', params);
}
