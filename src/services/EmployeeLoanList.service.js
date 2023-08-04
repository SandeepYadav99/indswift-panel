import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceUpdateEmployeeLoanList(params) {
    return await postRequest('employee/loans/update', params);
}

export async function serviceCreateEmployeeLoanList(params) {
    return await formDataRequest('employee/loans/create', params);
}
export async function serviceDeleteEmployeeLoanList(params) {
    return await postRequest('employee/loans/delete', params);
}
export async function serviceGetEmployeeLoanDetails(params) {
    return await postRequest('employee/loans/details', params);
}
export async function serviceGetEmployeeLoanList(params) {
    return await postRequest('employee/loans', params);
}
 

