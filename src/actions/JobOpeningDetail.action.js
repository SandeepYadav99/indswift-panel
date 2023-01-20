import {
    serviceCreateJobOpenings,
    serviceGetJobOpeningCandidates,
    serviceGetJobOpeningInterviewers
} from "../services/JobOpenings.service";
import EventEmitter from "../libs/Events.utils";
import {CREATE_DATA} from "./JobOpenings.action";


export const INIT_JOB_CANDIDATES = 'INIT_JOB_CANDIDATES';
export const DONE_JOB_CANDIDATES = 'DONE_JOB_CANDIDATES';
export const INIT_JOB_INTERVIEWERS = 'INIT_JOB_INTERVIEWERS';
export const DONE_JOB_INTERVIEWERS = 'DONE_JOB_INTERVIEWERS';

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
