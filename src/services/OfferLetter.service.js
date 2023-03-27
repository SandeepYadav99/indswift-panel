import {postRequest} from "../libs/AxiosService.util";


export async function serviceGetOfferLetterDetails(params) {
    return await postRequest('candidates/offer/letter/details', params);
}
