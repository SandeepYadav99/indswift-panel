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

export async function serviceExportPMSPlanner(params) {
    return await postRequest('pms/batches/export', params);
}

export async function serviceAlignPmsBatch(batchIds) {
    return await postRequest('pms/align/batches', { batch_ids: batchIds })
}

export async function serviceGetPmsBatchDetail(batchId) {
    return await postRequest('pms/batch/detail', { batch_id: batchId })
}

export async function serviceAddPMSPlanner(params) {
    return await postRequest('pms/add/planner', {...params});
}

export async function serviceGetPlannerDetail(batchId) {
    return await postRequest('pms/planner/detail', {batch_id: batchId})
}

export async function serviceAddPMSDraft(params) {
    return await postRequest('pms/add/draft', params);
}

export async function serviceGetPMSDraft(batchId) {
    return await postRequest('pms/get/draft', { batch_id: batchId });
}

export async function serviceRunAssignBatches() {
    return await getRequest('pms/assign/batches', {  });
}

