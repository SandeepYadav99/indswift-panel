import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateEmployees(params) {
    return await formDataRequest('employees/create', params);
}

