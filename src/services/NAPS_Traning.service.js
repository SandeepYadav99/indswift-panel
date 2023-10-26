import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceNapsTrningList(params) {
    return await postRequest('employees/completed/naps', params);
}