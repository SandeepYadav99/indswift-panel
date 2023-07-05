import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsOverallHod(params) {
    return await formDataRequest('pm/overall/hod/create', params);
}
export async function serviceUpdatePmsOverallHod(params) {
    return await postRequest('pm/overall/hod/update', params);
}

export async function serviceDeletePmsOverallHod(params) {
    return await postRequest('pm/overall/hod/delete', params);
}
export async function serviceGetPmsOverallHod(params) {
    return await postRequest('pms/overall/hod/batches', params);
}

export async function serviceExportPMSOverallHod(params) {
    return await postRequest('pms/batches/export', params);
}
export async function serviceAddPMSOverallHod(params) {
    return await postRequest('pms/add/hod', {...params});
}

export async function serviceGetHodDetail(batchId) {
    return await postRequest('pms/overall/hod/detail', {batch_id: batchId})
}

export async function serviceAddPMSDraft(params) {
    return await postRequest('pms/add/draft', params);
}

export async function serviceGetPMSDraft(batchId) {
    return await postRequest('pms/get/draft', { batch_id: batchId });
}


export async function serviceAlignPmsOverallHodBatch(batchIds) {
    return await postRequest('pms/overall/hod/align/batches', { batch_ids: batchIds })
}
