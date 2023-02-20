/**
 * Created by charnjeetelectrovese@gmail.com on 4/8/2020.
 */
import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateEmployee(params) {
    return await formDataRequest('employees/create', params);
}

export async function serviceUpdateEmployee(params) {
    return await formDataRequest('employees/update', params);
}

export async function serviceDeleteEmployee(params) {
    return await formDataRequest('employees/delete', params);
}


export async function serviceGetEmployee (params) {
    return await postRequest('employees', params);
}

export async function serviceEmployeeCodeCheck (params) {
    return await postRequest('employees/code/exists', params);
}
export async function serviceEmployeeCodeSubmit (params) {
    return await postRequest('employees/details', params);
}

export async function serviceEmployeeImportVerify (params) {
    return await formDataRequest('employees/import/verify', params);
}

export async function serviceEmployeeImportFile(params) {
    return await formDataRequest('employees/import', params);
}

export async function serviceGetEmployeeProgression(params) {
    return await postRequest('employee/progressions', params);
}
export async function serviceCheckEmployeeExists(params) {
    return await postRequest('employees/exists', params);
}

export async function serviceGetEmployeeEditInfo(params) {
    return await postRequest('employees/edit/info', params);
}

export async function serviceChangeEmployeePassword(params) {
    return await postRequest('employees/change/password', params);
}

export async function serviceChangeEmployeeStatus(params) {
    return await postRequest('employees/change/status', params);
}
