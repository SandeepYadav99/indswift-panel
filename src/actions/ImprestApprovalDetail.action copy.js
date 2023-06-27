import { serviceGetImprestApprovalTable } from "../services/ImprestApproval.service";

export const INIT_JOB_INTERVIEWERS = 'INIT_IMPREST_TABLE';
export const DONE_JOB_INTERVIEWERS = 'DONE_IMPREST_TABLE';
// export const INIT_JOB_VACANCIES = 'INIT_IMPREST_TABLE_OTHER';
// export const DONE_JOB_VACANCIES = 'DONE_IMPREST_TABLE_OTHER';

export function actionGetImprestInterviewers(openingId,type,index=1) {
    const request = serviceGetImprestApprovalTable({ employee_id: openingId ,imprest_type:type,index:index});
    return (dispatch) => {
        dispatch({ type: INIT_JOB_INTERVIEWERS, payload: null });
        request.then((data) => {
            if (!data.error) {
                dispatch({type: DONE_JOB_INTERVIEWERS, payload: data.data})
            }
        })
    }
}

// export function actionGetJobOpeningVacancies(openingId,type,index) {
//     const request = serviceGetImprestApprovalTable({ employee_id: openingId ,imprest_type:type,index:index});
//     return (dispatch) => {
//         dispatch({ type: INIT_JOB_VACANCIES, payload: null });
//         request.then((data) => {
//             if (!data.error) {
//                 dispatch({type: DONE_JOB_VACANCIES, payload: data.data})
//             }
//         })
//     }
// }

