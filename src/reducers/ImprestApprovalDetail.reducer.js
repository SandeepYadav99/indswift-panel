import {
  DONE_JOB_INTERVIEWERS,
  INIT_JOB_INTERVIEWERS,
  // INIT_JOB_VACANCIES,
  // DONE_JOB_VACANCIES
} from "../actions/ImprestApprovalDetail.action copy";

const initialState = {
  interviewers: [],
  isInterviewersFetching: false,
  // isVacanciesFetching: false,
  // vacancies: [],
};

export default function (
  state = JSON.parse(JSON.stringify(initialState)),
  action
) {
  switch (action.type) {
    case INIT_JOB_INTERVIEWERS: {
      return {
        ...state,
        isInterviewersFetching: true,
      };
    }
    case DONE_JOB_INTERVIEWERS: {
      return {
        ...state,
        interviewers: action.payload,
        isInterviewersFetching: false,
      };
    }
    // case INIT_JOB_VACANCIES: {
    //   return {
    //     ...state,
    //     isVacanciesFetching: true,
    //   };
    // }
    // case DONE_JOB_VACANCIES: {
    //   return {
    //     ...state,
    //     vacancies: action.payload,
    //     isVacanciesFetching: false,
    //   };
    // }
    default: {
      return state;
    }
  }
}
