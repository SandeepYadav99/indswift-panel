import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

 
export async function serviceUpdateMarrigeClaims(params) {
    return await formDataRequest('employee/claims/create/marraige', params);
}
export async function serviceUpdateMobileClaims(params) {
    return await formDataRequest('/employee/claims/create/mobile', params);
}
export async function serviceUpdateCarClaims(params) {
    return await formDataRequest('/employee/claims/create/car', params);
}
