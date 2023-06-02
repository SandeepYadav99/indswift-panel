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
    return await postRequest('pms/hod/review/planner', params);
}
