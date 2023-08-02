import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateIncrementLetter(params) {
    return await formDataRequest('increment/letter/budget/edit/versions/create', params);
}
export async function serviceDeleteIncrementLetter(params) {
    return await postRequest('increment/letter/delete', params);
}
export async function serviceGetIncrementLetter (params) {
    return await postRequest('pms/increment/letter/list', params);
}

export async function serviceFreezeIncrementLetters (params) {
    return await postRequest('pms/increment/letter/freeze', params);
}
