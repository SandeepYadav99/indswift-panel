import {
    DONE_JOB_CANDIDATES,
    DONE_JOB_INTERVIEWERS,
    INIT_JOB_CANDIDATES,
    INIT_JOB_INTERVIEWERS
} from "../actions/JobOpeningDetail.action";


const initialState = {
    candidates: [],
    isCandidatesFetching: false,
    interviewers: [],
    isInterviewersFetching: false,
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
        default: {
            return state;
        }
    }
}
