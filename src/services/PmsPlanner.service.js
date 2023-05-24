import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsPlanner(params) {
    return await formDataRequest('pm/planner/create', params);
}
export async function serviceUpdatePmsPlanner(params) {
    return await postRequest('pm/planner/update', params);
}

export async function serviceDeletePmsPlanner(params) {
    return await postRequest('pm/planner/delete', params);
}
export async function serviceGetPmsPlanner(params) {
    return await postRequest('pms/type/four/list', params);
}

export async function serviceUpdateReviewPlanner(params) {
    return await postRequest('pms/update/review/planner', params);
}

export async function serviceGetReviewPlanner(params) {
    return await postRequest('pms/get/review/planner', params);
}

export async function serviceAssignReviewPlanner(params) {
    return await postRequest('pms/assign/review/planner', params);
}
