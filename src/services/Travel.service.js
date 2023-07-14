import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateTravel(params) {
    return await formDataRequest('travel/traveleate', params);
}
export async function serviceUpdateTravel(params) {
    return await postRequest('travel/update', params);
}

export async function serviceCreateTravelPlanner(params) {
    return await formDataRequest('travel/planner/create', params);
}
export async function serviceDeleteTravel(params) {
    return await postRequest('travel/delete', params);
}
export async function serviceGetTravelDetails(params) {
    return await postRequest('employee/travel/details', params);
}
export async function serviceGetTravel(params) {
    return await postRequest('travel/planner', params);
}
export async function serviceDetailsTravel(params) {
    return await postRequest('travel/planner/details', params);
}
export async function serviceGetTravelDetail(params){
    return await getRequest('employee/travel/type',params)
}
export async function serviceApproveTravel(params) {
    return await postRequest('travel/accept', params);
}
export async function serviceRejectTravel(params) {
    return await postRequest('travel/reject', params);
}
export async function serviceClosuretravel(params) {
    return await postRequest('travel/planner/mark/closed', params);
}
