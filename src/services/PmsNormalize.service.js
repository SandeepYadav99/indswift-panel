import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreatePmsNormalize(params) {
    return await formDataRequest('pm/normalize/create', params);
}
export async function serviceUpdatePmsNormalize(params) {
    return await postRequest('pm/normalize/update', params);
}

export async function serviceDeletePmsNormalize(params) {
    return await postRequest('pm/normalize/delete', params);
}
export async function serviceGetPmsNormalize(params) {
    return await postRequest('pms/normalized/list', params);
}
export async function serviceGetPmsNormalizeGraphData(params) {
    return await postRequest('pms/normalization/analytics', params);
}
export async function serviceGetPmsNormalizeTableData(params) {
    return await postRequest('pms/reviewer/avg/list', params);
}



