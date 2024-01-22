import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceEmployeeRecordApprovalList(params) {
    return await postRequest('employees/records/versions', params);
}

export async function serviceEmployeeRecordApprovalDetails(params) {
    return await postRequest('employees/records/versions/detail', params);
}

export async function serviceEmployeeRecordApprovalApprove(params) {
    return await postRequest('employees/records/versions/approve', params);
}

export async function serviceEmployeeRecordApprovalReject(params) {
    return await postRequest('employees/records/versions/reject', params);
}