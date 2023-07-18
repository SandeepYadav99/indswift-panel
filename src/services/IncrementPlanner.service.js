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
