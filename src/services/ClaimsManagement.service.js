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
export async function serviceGetmyImprestDetailsCLaim(params) {
    return await postRequest('imprest/details', params);
}
export async function serviceUpdateEmployeeLoan(params) {
    return await formDataRequest('employee/loans/create', params);
}
export async function serviceCheckLoanAmount (params) {
    return await postRequest('employee/loans/check', params);
}
export async function serviceUpdateIntClaim(params) {
    return await formDataRequest('employee/claims/create/travel', params);
}
export async function serviceUpdateForeignClaim(params) {
    return await formDataRequest('employee/claims/create/travel/foreign', params);
}
export async function serviceUpdateFile(params) {
    return await formDataRequest('files/upload', params,{"folder": "tax_rebate"});
}
export async function serviceCreateTaxForm(params) {
    return await postRequest('tax/rebate/create', params);
}
export async function serviceGetTotalTaxForm(params) {
    return await postRequest('tax/rebate/totals', params);
}
export async function serviceGetTaxDetail(params) {
    return await postRequest('tax/rebate/drafted', params);
}