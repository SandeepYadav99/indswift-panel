import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceDeleteLoanList(params) {
    return await postRequest('employee/loans/review/delete', params);
}
export async function serviceGetLoanListDetails(params) {
    return await postRequest('employee/claims/details', params);
}
export async function serviceGetLoanList(params) {
    return await postRequest('employee/loans/review', params);
}
export async function serviceDetailsLoanList(params) {
    return await postRequest('employee/loans/review', params);
}
export async function serviceGetClaimDetail(params){
    return await getRequest('employee/loans/review',params)
}
export async function serviceApproveLoanList(params) {
    return await postRequest('employee/loans/review/accept', params);
}
export async function serviceRejectLoanList(params) {
    return await postRequest('employee/loans/review/reject', params);
}

