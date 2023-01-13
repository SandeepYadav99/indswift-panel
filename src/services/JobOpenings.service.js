/**
 * Created by charnjeetelectrovese@gmail.com on 4/8/2020.
 */
import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateJobOpenings(params) {
    return await formDataRequest('job/openings/create', params);
}

export async function serviceUpdateJobOpenings(params) {
    return await formDataRequest('job/openings/update', params);
}

export async function serviceDeleteJobOpenings(params) {
    return await formDataRequest('job/openings/delete', params);
}


export async function serviceGetJobOpenings (params) {
    return await postRequest('job/openings', params);
}

export async function serviceJobOpeningsCodeCheck (params) {
    return await postRequest('job/openings/code/exists', params);
}

export async function serviceJobOpeningsDetails (params) {
    return await postRequest('job/openings/details', params);
}
