import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsPending(params) {
    return await formDataRequest('pm/create', params);
}
export async function serviceUpdatePmsPending(params) {
    return await postRequest('pm/update', params);
}

export async function serviceDeletePmsPending(params) {
    return await postRequest('pm/delete', params);
}
export async function serviceGetPmsPending(params) {
    return await postRequest('pms/my/batches', params);
}
export async function serviceGetPmsCanReview(params) {
    return await postRequest('pms/master/can/review/batch', params);
}