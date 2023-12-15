import {formDataRequest, postRequest} from "../libs/AxiosService.util";



export async function serviceGetEmployeeVersions(params) {
    return await formDataRequest('employee/edit/versions', params);
}

export async function serviceEditEmployeeVersion(params) {
    return await formDataRequest('employee/edit/versions/create', params);
}

export async function serviceGetVersionDetail(params) {
    return await postRequest('employee/edit/versions/detail', params);
}

export async function serviceGetVersionDetails(params) {
    return await postRequest('employees/records/versions/detail', params);
}
export async function serviceVersionApprove(params) {
    return await postRequest('employee/edit/versions/approve', params);
}

export async function serviceVersionReject(params) {
    return await postRequest('employee/edit/versions/reject', params);
}
