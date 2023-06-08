import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateTravelAuth(params) {
    return await formDataRequest('travel/auth/rate', params);
}
export async function serviceUpdateTravelAuth(params) {
    return await postRequest('travel/auth/update', params);
}

export async function serviceCreateTravelAuthPlanner(params) {
    return await formDataRequest('travel/auth/planner/create', params);
}
export async function serviceDeleteTravelAuth(params) {
    return await postRequest('travel/auth/delete', params);
}
export async function serviceGetTravelAuthDetails(params) {
    return await postRequest('tpr/details', params);
}
export async function serviceGetTravelAuth(params) {
    return await postRequest('tpr', params);
}
export async function serviceDetailsTravelAuth(params) {
    return await postRequest('travel/auth/planner/details', params);
}
export async function serviceGetTravelAuthDetail(params){
    return await getRequest('employee/travel/auth/type',params)
}
export async function serviceApproveTravelAuth(params) {
    return await postRequest('tpr/accept', params);
}
export async function serviceRejectTravelAuth(params) {
    return await postRequest('tpr/reject', params);
}
