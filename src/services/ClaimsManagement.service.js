import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

 
export async function serviceUpdateMarrigeClaims(params) {
    return await formDataRequest('employee/claims/create/marraige', params);
}
export async function serviceUpdateMobileClaims(params) {
    return await formDataRequest('employee/claims/create/mobile', params);
}
export async function serviceUpdateCarClaims(params) {
    return await formDataRequest('employee/claims/create/car', params);
}
export async function serviceGetEmployeeDetails (params) {
    return await postRequest('employees/details', params);
}
export async function serviceUpdateHealthClaims(params) {
    return await formDataRequest('employee/claims/create/phc', params);
}
export async function serviceUpdateTravelClaims(params) {
    return await formDataRequest('employee/claims/create/lt', params);
}
export async function serviceUpdateLocClaims(params) {
    return await formDataRequest('employee/claims/create/relocation', params);
}
export async function serviceCheckCoPassenger (params) {
    return await postRequest('travel/planner/check', params);
}