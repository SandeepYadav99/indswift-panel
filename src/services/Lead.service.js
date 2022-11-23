/**
 * Created by charnjeetelectrovese@gmail.com on 6/29/2020.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceGetLead(params) {
    return await postRequest('lead/list/requests', params);
}

export async function serviceGetLeadDetail(params) {
    return await postRequest('lead/details', params);
}

export async function serviceGetLeadRequests( params) {
    return await postRequest('lead/requests', params);
}

export async function serviceGetLeadNotes(params) {
    return await postRequest('lead/notes', params);
}

export async function serviceChangeLeadStatus(params) {
    return await postRequest('lead/change/status', params);
}

export async function serviceChangeLeadPriority(params) {
    return await postRequest('lead/change/priority', params);
}

export async function serviceChangeLeadRequestStatus(params) {
    return await postRequest('lead/requests/change/status', params);
}

export async function serviceAddLeadNote(params) {
    return await postRequest('lead/notes/create', params);
}

export async function serviceGetLeadUsers(params) {
    return await postRequest('lead/users/crm', params);
}

export async function serviceAssignUserToLead(params) {
    return await postRequest('lead/assign/user', params);
}


export async function serviceGetLeadUserDetails(params) {
    return await postRequest('/lead/user/data', params);
}

export async function serviceUpdateLeadUserData(params) {
    return await postRequest('lead/update/user/data', params);
}

export async function serviceOnboardVendorData(params) {
    return await formDataRequest('/lead/on/board/vendor', params);
}
