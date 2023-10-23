import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceExpireLetterList(params) {
    return await postRequest('offer/letters/expiring/list', params);
}

export async function serviceMarkExpired(params) {
    return await postRequest('offer/letters/mark/expired', params);
}

export async function serviceMarkResharedOfferLetter(params) {
    return await postRequest('offer/letters/mark/expired', params);
}