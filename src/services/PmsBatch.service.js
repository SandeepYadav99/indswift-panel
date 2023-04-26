import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsBatch(params) {
    return await formDataRequest('pm/create', params);
}
export async function serviceUpdatePmsBatch(params) {
    return await postRequest('pm/update', params);
}

export async function serviceDeletePmsBatch(params) {
    return await postRequest('pm/delete', params);
}
export async function serviceGetPmsBatch(params) {
    return await postRequest('pms/batches', params);
}

export async function serviceExportPMSBatch(params) {
    return await postRequest('pms/batches/export', params);
}


