import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsSiteReview(params) {
    return await formDataRequest('pm/site/eview/create', params);
}
export async function serviceUpdatePmsSiteReview(params) {
    return await postRequest('pm/site/eview/update', params);
}

export async function serviceDeletePmsSiteReview(params) {
    return await postRequest('pm/site/eview/delete', params);
}
export async function serviceGetPmsSiteReview(params) {
    return await postRequest('pms/site/batches', params);
}

export async function serviceExportPmsSiteReview(params) {
    return await postRequest('pms/site/batches/export', params);
}

export async function serviceAlignPmsBatch(batchIds) {
    return await postRequest('pms/site/align/batches', { batch_ids: batchIds })
}

export async function serviceGetPmsBatchDetail(batchId) {
    return await postRequest('pms/site/batch/detail', { batch_id: batchId })
}

export async function serviceAddPmsSiteReview(params) {
    return await postRequest('pms/site/add/review', {...params});
}

export async function serviceGetReviewDetail(batchId) {
    return await postRequest('pms/site/review/detail', {batch_id: batchId})
}


