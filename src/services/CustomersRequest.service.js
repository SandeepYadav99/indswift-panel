import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCustomers(params) {
    return await formDataRequest('customers/create', params);
}
export async function serviceUpdateCustomers(params) {
    return await formDataRequest('customers/update', params);
}

export async function serviceGetCustomers(params) {
    return await postRequest('customers', params);
}

export async function serviceGetCustomerByContact(params) {
    return await postRequest('customers/detail/contact', params);
}
