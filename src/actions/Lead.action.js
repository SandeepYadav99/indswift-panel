/**
 * Created by charnjeetelectrovese@gmail.com on 6/29/2020.
 */
import store from '../store';
import Constants from '../config/constants';
import {
    serviceAddLeadNote, serviceAssignUserToLead,
    serviceChangeLeadPriority, serviceChangeLeadRequestStatus,
    serviceChangeLeadStatus,
    serviceGetLead,
    serviceGetLeadDetail,
    serviceGetLeadNotes,
    serviceGetLeadRequests, serviceGetVendorDetail
} from "../services/Lead.service";

export const FETCH_INIT = 'FETCH_INIT_LEAD';
export const FETCHED = 'FETCHED_LEAD';
export const FETCHED_FAIL = 'FETCHED_FAIL_LEAD';
export const FETCHED_FILTER = 'FETCHED_FILTER_LEAD';
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = 'FETCH_NEXT_LEAD';
export const FILTER = 'FILTER_LEAD';
export const RESET_FILTER = 'RESET_FILTER_LEAD';
export const SET_SORTING = 'SET_SORTING_LEAD';
export const SET_FILTER = 'SET_FILTER_LEAD';
export const SET_PAGE = 'SET_PAGE_LEAD';
export const CHANGE_PAGE = 'CHANGE_PAGE_LEAD';
export const CHANGE_STATUS = 'CHANGE_STATE_LEAD';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_LEAD';
export const CREATE_DATA = 'CREATE_LEAD';
export const UPDATE_DATA = 'UPDATE_LEAD';
export const CLEAN_LIST = 'CLEAN_LIST_LEAD';
export const UPDATE_STATUS = 'UPDATE_STATUS_LEAD'

export const LEAD_DETAIL_INIT = 'LEAD_DETAIL_INIT';
export const LEAD_DETAIL_DONE = 'LEAD_DETAIL_DONE';
export const CHANGE_LEAD_STATUS = 'CHANGE_LEAD_STATUS';
export const CHANGE_LEAD_PRIORITY = 'CHANGE_LEAD_PRIORITY';

export const LEAD_REQUESTS_GET_INIT = 'LEAD_REQUEST_GET_INIT';
export const LEAD_REQUESTS_GET_DONE = 'LEAD_REQUESTS_GET_DONE';
export const CHANGE_LEAD_REQUEST_STATUS = 'CHANGE_LEAD_REQUEST_STATUS';
export const LEAD_NOTES_GET_INIT = 'LEAD_NOTES_GET_INIT';
export const LEAD_NOTES_GET_DONE = 'LEAD_NOTES_GET_DONE';
export const ADD_LEAD_NOTES = 'ADD_LEAD_NOTES';
export const ASSIGN_LEAD = 'ASSIGN_LEAD';
export const SET_LEAD_REQUEST_TYPE = 'SET_LEAD_REQUEST_TYPE';
export const UPDATE_LEADFORM_DATA = 'UPDATE_LEADFORM_DATA'

export function actionFetchLead(index = 1, sorting = {}, filter = {}, shouldReset = false,type) {
    const request = serviceGetLead({index, row: sorting.row, order: sorting.order, type, ...filter}); // GetOrder
    return (dispatch) => {
        if (shouldReset) {
            dispatch({
                type: CHANGE_PAGE,
                payload: 1,
            });
        }
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: SET_FILTER, payload: filter});
            dispatch({type: SET_SORTING, payload: sorting});
            if (!data.error) {
                dispatch({type: FETCHED, payload: {data: data.data, page: index}});
                dispatch({type: SET_SERVER_PAGE, payload: index});
                if (index == 1) {
                    dispatch({type: CHANGE_PAGE, payload: index - 1});
                }
            } else {
                dispatch({type: FETCHED_FAIL, payload: null});
            }
        });
    };
}

export function actionCreateLead(data) {
    return (dispatch) => {
        dispatch({type: CREATE_DATA, payload: data})
    }
}

export function actionUpdateLead(data) {
    return (dispatch) => {
        dispatch({type: UPDATE_DATA, payload: data})
    }
}

export function actionUpdateJobStatus(status) {
    return (dispatch) => {
        dispatch({ type: UPDATE_STATUS, payload: status })
    }
}


export function actionChangePageLead(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}

export function actionSetLeadRequestType(type){
    return (dispatch) => {
        dispatch({type: SET_LEAD_REQUEST_TYPE, payload: type});
    }
}
// export function nextPRequestsClick() {
//     return {
//         type: NEXT_PREQUESTS,
//         payload: null,
//     };
// }
//
// export function prevPRequestsClick() {
//     return {
//         type: PREV_PREQUESTS,
//         payload: null,
//     };
// }

export function actionFilterLead(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}


export function actionChangeStatusLead(params) {
    // const request = serviceUpdateLead({id: params.id, status: params.type});
    // return (dispatch) => {
    //     request.then((data) => {
    //         dispatch({type: CHANGE_STATUS, payload: {id: params.id, status: params.type}});
    //     });
    // };
}

export function actionResetFilterLead() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionCleanLead() {
    return {
        type: CLEAN_LIST,
        payload: null,
    };
}

export function actionSetPageLead(page) {
    const stateData = store.getState().lead;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchLead(serverPage + 1, sortingData, {query, query_data: queryData}));
        // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };
    // if (this.props.totalUsers <= ((this.props.currentPage + 1) * 100)) {
    //         // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order);
    //         this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
    //     }

}


export function actionGetLeadDetails(leadId) {
    const req = serviceGetLeadDetail({ lead_id: leadId });
    return (dispatch) => {
        dispatch({ type: LEAD_DETAIL_INIT, payload: null });
        req.then((res) => {
            if (!res.error) {
                dispatch({ type: LEAD_DETAIL_DONE, payload: res.data });
            }
        })
    }
}

export function actionGetLeadRequests(leadId) {
    const req = serviceGetLeadRequests({ lead_id: leadId });
    return (dispatch) => {
        dispatch({ type: LEAD_REQUESTS_GET_INIT, payload: null });
        req.then((res) => {
            if (!res.error) {
                dispatch({ type: LEAD_REQUESTS_GET_DONE, payload: res.data });
            }
        })
    }
}

export function actionGetLeadNotes(leadId) {
    const req = serviceGetLeadNotes({ lead_id: leadId });
    return (dispatch) => {
        dispatch({ type: LEAD_NOTES_GET_INIT, payload: null });
        req.then((res) => {
            if (!res.error) {
                dispatch({ type: LEAD_NOTES_GET_DONE, payload: res.data });
            }
        })
    }
}

export function actionChangeLeadStatus(leadId, status) {
    const req = serviceChangeLeadStatus({lead_id: leadId, status});
    return (dispatch) => {
        dispatch({ type: CHANGE_LEAD_STATUS, payload: status });
    }
}

export function actionChangeLeadPriority(leadId, priority) {
    const req = serviceChangeLeadPriority({lead_id: leadId, priority});
    return (dispatch) => {
        dispatch({ type: CHANGE_LEAD_PRIORITY, payload: priority });
    }
}

export function actionChangeLeadRequestStatus(requestId, status) {
    const req = serviceChangeLeadRequestStatus({request_id: requestId, status});
    return (dispatch) => {
        dispatch({ type: CHANGE_LEAD_REQUEST_STATUS, payload: {request_id: requestId, status} });
    }
}

export function actionAddLeadNote(leadId, data) {
    const req = serviceAddLeadNote({lead_id: leadId, ...data});
    return (dispatch) => {
        req.then(res => {
            if (!res.error) {
                dispatch({ type: ADD_LEAD_NOTES, payload: res.data });
            }
        })

    }
}

export function actionAssignLead(leadId, userId) {
    const req = serviceAssignUserToLead({lead_id: leadId, user_id: userId});
    return dispatch => {
        req.then(res => {
           if (!res.error) {
               dispatch({ type: ASSIGN_LEAD, payload: res.data });
           }
        });
    }
}

export function actionUpdateLeadFormData(data){
    return (dispatch) => {
        dispatch({ type: UPDATE_LEADFORM_DATA, payload: data })
    }
}
