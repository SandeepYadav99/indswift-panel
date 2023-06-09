import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsHod(params) {
    return await formDataRequest('pm/hod/create', params);
}
export async function serviceUpdatePmsHod(params) {
    return await postRequest('pm/hod/update', params);
}

export async function serviceDeletePmsHod(params) {
    return await postRequest('pm/hod/delete', params);
}
export async function serviceGetPmsHod(params) {
    return await postRequest('pms/hod/batches', params);
}

export async function serviceExportPMSHod(params) {
    return await postRequest('pms/batches/export', params);
}
export async function serviceAddPMSHod(params) {
    return await postRequest('pms/add/hod', {...params});
}

export async function serviceGetHodDetail(batchId) {
    return await postRequest('pms/hod/detail', {batch_id: batchId})
}

export async function serviceAddPMSDraft(params) {
    return await postRequest('pms/add/draft', params);
}

export async function serviceGetPMSDraft(batchId) {
    return await postRequest('pms/get/draft', { batch_id: batchId });
}


export async function serviceAlignPmsHodBatch(batchIds) {
    return await postRequest('pms/hod/align/batches', { batch_ids: batchIds })
}
