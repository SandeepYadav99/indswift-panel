import {
    DONE_JOB_CANDIDATES,
    DONE_JOB_INTERVIEWERS, DONE_JOB_VACANCIES,
    INIT_JOB_CANDIDATES,
    INIT_JOB_INTERVIEWERS, INIT_JOB_VACANCIES,
    INACTIVE_VACENCY,
    DONE_INACTIVE_VACANCIES
} from "../actions/JobOpeningDetail.action";


const initialState = {
    candidates: [],
    isCandidatesFetching: false,
    interviewers: [],
    isInterviewersFetching: false,
    isVacanciesFetching: false,
    vacancies: [],
};

export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
    switch (action.type) {
        case INIT_JOB_CANDIDATES: {
            return {...state, isCandidatesFetching: true};
        }
        case DONE_JOB_CANDIDATES: {
            return {
                ...state,
                candidates: action.payload,
                isCandidatesFetching: false,
            };
        }
        case INIT_JOB_INTERVIEWERS: {
            return {
                ...state,
                isInterviewersFetching: true
            }
        }
        
        case DONE_JOB_INTERVIEWERS: {
            return {
                ...state,
                interviewers: action.payload,
                isInterviewersFetching: false
            }
        }
        case INIT_JOB_VACANCIES: {
            return {
                ...state,
                isVacanciesFetching: true,
            }
        }
        case DONE_JOB_VACANCIES: {
            return {
                ...state,
                vacancies: action.payload,
                isVacanciesFetching: false
            }
        }
        case INACTIVE_VACENCY:{
            return {
                ...state,

            }
        }
        case DONE_INACTIVE_VACANCIES :{
           return {
            ...state,
            vacancy_id:action.payload.vacancy_id,
            reason:action.payload.reason
           }

        }
        default: {
            return state;
        }
    }
}
