import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateIncrementPlanner(params) {
    return await formDataRequest('increment/planner/budget/edit/versions/create', params);
}


export async function serviceDeleteIncrementPlanner(params) {
    return await postRequest('increment/planner/delete', params);
}

export async function serviceGetIncrementPlanner (params) {
    return await postRequest('pms/increment/planner', params);
}

export async function serviceUpdateIncrementPlanner(params) {
    return await postRequest('pms/update/increment/planner', params);
}

export async function serviceIncrementPlannerStatus (params) {
    return await postRequest('pms/increment/planner/status', params);
}
export async function serviceIncrementPlannerDownload (params) {
    return await postRequest('pms/increment/planner/export', params);
}
export async function serviceGetIncrementDetailInfo (params) {
    return await postRequest('pms/increment/planner/analytics', params);
}

export async function serviceRefreshIncrementPlanner (params) {
    return await postRequest('pms/refresh/increment/planner', params);
}

export async function serviceIncrementPlannerAnalyticsDownload(params) {
    return await postRequest('pms/increment/planner/analytics/export', params);
}

export async function serviceGetEmployeePmsRatings(params) {
    return await postRequest('pms/employee/ratings', params);
}

export async function serviceFreezeIncrementPlanner(params){
    return await postRequest('pms/freeze/increment/planner', params);
}
