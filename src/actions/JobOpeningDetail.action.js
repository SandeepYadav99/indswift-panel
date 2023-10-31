import {
    serviceCreateJobOpenings,
    serviceGetJobOpeningCandidates,
    serviceGetJobOpeningInterviewers,
    serviceVacanciesInactive
} from "../services/JobOpenings.service";
import {serviceGetVacancies} from "../services/Vacancy.service";




export const INIT_JOB_CANDIDATES = 'INIT_JOB_CANDIDATES';
export const DONE_JOB_CANDIDATES = 'DONE_JOB_CANDIDATES';
export const INIT_JOB_INTERVIEWERS = 'INIT_JOB_INTERVIEWERS';
export const DONE_JOB_INTERVIEWERS = 'DONE_JOB_INTERVIEWERS';
export const INIT_JOB_VACANCIES = 'INIT_JOB_VACANCIES';
export const DONE_JOB_VACANCIES = 'DONE_JOB_VACANCIES';
export const INACTIVE_VACENCY ="INACTIVE_VACENCY";
export const DONE_INACTIVE_VACANCIES ="DONE_INACTIVE_VACANCIES";

export function actionGetJobOpeningCandidates(openingId) {
    const request = serviceGetJobOpeningCandidates({ id: openingId });
    return (dispatch) => {
        dispatch({ type: INIT_JOB_CANDIDATES, payload: null });
        request.then((data) => {
            if (!data.error) {
                dispatch({type: DONE_JOB_CANDIDATES, payload: data.data})
            }
        })
    }
}


export function actionGetJobOpeningInterviewers(openingId) {
    const request = serviceGetJobOpeningInterviewers({ id: openingId });
    return (dispatch) => {
        dispatch({ type: INIT_JOB_INTERVIEWERS, payload: null });
        request.then((data) => {
            if (!data.error) {
                dispatch({type: DONE_JOB_INTERVIEWERS, payload: data.data})
            }
        })
    }
}


export function actionGetJobOpeningVacancies(openingId) {
    const request = serviceGetVacancies({ job_id: openingId });
    return (dispatch) => {
        dispatch({ type: INIT_JOB_VACANCIES, payload: null });
        request.then((data) => {
            if (!data.error) {
                dispatch({type: DONE_JOB_VACANCIES, payload: data.data})
            }
        })
    }
}

export function actionGetMarkInactive(vacancy) {

    const request = serviceVacanciesInactive({ vacancy_id: vacancy.vacancy_id , reason:vacancy.reason});
    return (dispatch) => {
        dispatch({ type: INACTIVE_VACENCY, payload: null });
        request.then((data) => {
            if (!data.error) {
                dispatch({type: DONE_INACTIVE_VACANCIES, payload: data.data})
                window.location.reload();
            }
        })
    }
}