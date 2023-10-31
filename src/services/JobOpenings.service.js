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

export async function serviceGetJobOpeningCandidates(params) {
    return await postRequest('job/openings/candidates', params);
}

export async function serviceAddJobOpeningInterviewers(params) {
    return await postRequest('job/openings/interviewers/add', params);
}

export async function serviceGetJobOpeningInterviewers(params) {
    return await postRequest('job/openings/interviewers', params);
}

export async function serviceRejectJobCandidates(params) {
    return await postRequest('job/openings/candidates/reject', params);
}

export async function serviceShortlistJobCandidates(params) {
    return await postRequest('job/openings/candidates/shortlist', params);
}

export async function serviceScheduleInterview(params) {
    return await postRequest('job/openings/interview/schedule', params);
}

export async function serviceRequestCVShortlist(params) {
    return await postRequest('job/openings/request/cv/shortlist', params);
}

export async function serviceVacanciesInactive(params) {
    return await postRequest('/vacancies/inactivate', params);
}