import store from '../store';
import Constants from '../config/constants';
import {serviceCreateInterviewClaims, serviceGetInterviewClaims, serviceUpdateInterviewClaims,serviceDeleteInterviewClaims} from "../services/InterviewClaims.service";
import EventEmitter from "../libs/Events.utils";


export const FETCH_INIT = 'FETCH_INIT_INTERVIEW_CLAIMS';
export const FETCHED = 'FETCHED_INTERVIEW_CLAIMS';
export const FETCHED_FAIL = 'FETCHED_FAIL_INTERVIEW_CLAIMS';
export const FETCHED_FILTER = 'FETCHED_FILTER_INTERVIEW_CLAIMS';
export const FETCH_NEXT = 'FETCH_NEXT_INTERVIEW_CLAIMS';
export const FILTER = 'FILTER_INTERVIEW_CLAIMS'; 
export const RESET_FILTER = 'RESET_FILTER_INTERVIEW_CLAIMS';
export const SET_SORTING = 'SET_SORTING_INTERVIEW_CLAIMS';
export const SET_FILTER = 'SET_FILTER_INTERVIEW_CLAIMS';
export const SET_PAGE = 'SET_PAGE_INTERVIEW_CLAIMS';
export const CHANGE_PAGE = 'CHANGE_PAGE_INTERVIEW_CLAIMS';
export const CHANGE_STATUS= 'CHANGE_STATE_INTERVIEW_CLAIMS';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_INTERVIEW_CLAIMS';
export const CREATE_DATA = 'CREATE_INTERVIEW_CLAIMS';
export const UPDATE_DATA = 'UPDATE_INTERVIEW_CLAIMS';
export const DELETE_ITEM = 'DELETE_INTERVIEW_CLAIMS';


export function actionFetchInterviewClaims(index = 1, sorting = {}, filter = {}) {
    const request = serviceGetInterviewClaims({ index, row: sorting.row, order: sorting.order, ...filter });
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: SET_FILTER, payload: filter});
            dispatch({type: SET_SORTING, payload: sorting});
            if (!data.error) {
                dispatch({type: FETCHED, payload: { data: data.data, page: index }});
                dispatch({ type: SET_SERVER_PAGE, payload: index });
                if (index == 1) {
                    dispatch({type: CHANGE_PAGE, payload: index - 1});
                }
            } else {
                dispatch({type: FETCHED_FAIL, payload: null});
            }
        });
    };
}

export function actionCreateInterviewClaims(data) {
    const request = serviceCreateInterviewClaims(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateInterviewClaims(data) {
    const request = serviceUpdateInterviewClaims(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteInterviewClaims(id) {
    const request = serviceDeleteInterviewClaims({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageInterviewClaims(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}


export function actionFilterInterviewClaims(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusInterviewClaims(id, status) {
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterInterviewClaims() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageInterviewClaims(page) {
    const stateData = store.getState().interview_claims;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data; 
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchInterviewClaims(serverPage + 1, sortingData, {query, query_data: queryData}));
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };

}
