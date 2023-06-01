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
    return await postRequest('pms/normalize/batches', params);
}



