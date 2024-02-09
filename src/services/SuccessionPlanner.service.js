import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceGetSuccessionPlanerList(params) {
    return await postRequest('employee/succession/retirement/list/year', params);
}
export async function serviceGetSuccessionPlanerHistory(params) {
    return await postRequest('employee/succession/succession/history', params);
}
export async function serviceGetSuccessionPlanerSend(params) {
    return await postRequest('employee/succession/send/form', params);
}
export async function serviceSuccessionRetire(params) {
    return await postRequest('/employee/succession/retire/employee', params);
}