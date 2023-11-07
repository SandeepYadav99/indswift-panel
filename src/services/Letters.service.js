import { postRequest} from '../libs/AxiosService.util';
// C3M Letters 
export async function serviceC3MLetterList(params) {
    return await postRequest('employees/c3m/list', params);
}
// Appointment Letter 
export async function serviceAppointmentLetterList(params) {
    return await postRequest('employees/appointment/letter/list', params);
}
// Naps Traning Letter 
export async function serviceNapsTrningList(params) {
    return await postRequest('employees/completed/naps', params);
}
// Relieving Exp Letters 
export async function serviceRelievingExpLetterList(params) {
    return await postRequest('experience/letter/review', params);
}

export async function serviceRelievingExpLetterDetail(params) {
    return await postRequest('experience/letter/review/details', params);
}

export async function serviceRelievingExpLetterApprival(params) {
    return await postRequest('experience/letter/review/accept', params);
}

export async function serviceSendRelievingExpLetter(params) {
    return await postRequest('api/admin/exit/interview/share', params);
}