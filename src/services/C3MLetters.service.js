import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceC3MLetterList(params) {
    return await postRequest('employees/c3m/list', params);
}