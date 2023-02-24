import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateInterviewSchedule(params) {
    return await formDataRequest('interviewer/schedules/create', params);
}
export async function serviceUpdateInterviewSchedule(params) {
    return await postRequest('interviewer/schedules/update', params);
}

export async function serviceDeleteInterviewSchedule(params) {
    return await postRequest('interviewer/schedules/delete', params);
}
export async function serviceGetInterviewScheduleDetails(params) {
    return await postRequest('interviewer/schedules/details', params);
}
export async function serviceGetInterviewSchedule(params) {
    return await postRequest('interviewer/schedules', params);
}

export async function serviceInterviewScheduleCheck (params) {
    return await postRequest('interviewer/schedules/check', params);
}
