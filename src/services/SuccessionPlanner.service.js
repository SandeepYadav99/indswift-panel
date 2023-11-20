import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceGetSuccessionPlanerList(params) {
    return await postRequest('employee/succession/retirement/list', params);
}
export async function serviceGetSuccessionPlanerHistory(params) {
    return await postRequest('employee/succession/succession/history', params);
}
export async function serviceGetSuccessionPlanerSend(params) {
    return await postRequest('employee/succession/send/form', params);
}
