import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsReview(params) {
    return await formDataRequest('pm/review/create', params);
}
export async function serviceUpdatePmsReview(params) {
    return await postRequest('pm/review/update', params);
}

export async function serviceDeletePmsReview(params) {
    return await postRequest('pm/review/delete', params);
}
export async function serviceGetPmsReview(params) {
    return await postRequest('pms/reviewer/batches', params);
}

export async function serviceExportPMSReview(params) {
    return await postRequest('pms/batches/export', params);
}


