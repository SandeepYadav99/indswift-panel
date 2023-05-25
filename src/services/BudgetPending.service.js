import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateBudgetPending(params) {
    return await formDataRequest('budget/create', params);
}
export async function serviceUpdateBudgetPending(params) {
    return await postRequest('budget/update', params);
}

export async function serviceDeleteBudgetPending(params) {
    return await postRequest('budget/delete', params);
}
export async function serviceGetBudgetPendingDetails(params) {
    return await postRequest('annual/budget/edit/versions/detail', params);
}
export async function serviceGetBudgetPending(params) {
    return await postRequest('annual/budget/edit/versions', params);
}

export async function serviceBudgetPendingCheck (params) {
    return await postRequest('budget/check', params);
}

export async function serviceBudgetPendingApprove(params) {
    return await postRequest('annual/budget/edit/versions/approve', params);
}

export async function serviceBudgetPendingReject(params) {
    return await postRequest('annual/budget/edit/versions/reject', params);
}
