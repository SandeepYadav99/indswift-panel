/**
 * Created by charnjeetelectrovese@gmail.com on 4/8/2020.
 */
import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateEmployee(params) {
    return await formDataRequest('employee/create', params);
}

export async function serviceUpdateEmployee(params) {
    return await formDataRequest('employee/update', params);
}

export async function serviceDeleteEmployee(params) {
    return await formDataRequest('employee/delete', params);
}


export async function serviceGetEmployee (params) {
    return await postRequest('employee', params);
}

export async function serviceEmployeeCodeCheck (params) {
    return await postRequest('employee/code/exists', params);
}

export async function serviceEmployeeVariantCheck (params) {
    return await postRequest('employee/variants/exists', params);
}

export async function serviceEmployeeDetails (params) {
    return await postRequest('employee/detail', params);
}
