/**
 * Created by charnjeetelectrovese@gmail.com on 4/8/2020.
 */
import store from '../store';
import Constants from '../config/constants';
import {serviceCreateCandidate, serviceGetCandidate, serviceUpdateCandidate,serviceDeleteCandidate} from "../services/Candidate.service";
import EventEmitter from "../libs/Events.utils";
import {serviceDeleteCategory} from "../services/Category.service";


export const FETCH_INIT = 'FETCH_INIT_CANDIDATE';
export const FETCHED = 'FETCHED_CANDIDATE';
export const FETCHED_FAIL = 'FETCHED_FAIL_CANDIDATE';
export const FETCHED_FILTER = 'FETCHED_FILTER_CANDIDATE';
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = 'FETCH_NEXT_CANDIDATE';
export const FILTER = 'FILTER_CANDIDATE'; 
export const RESET_FILTER = 'RESET_FILTER_CANDIDATE';
export const SET_SORTING = 'SET_SORTING_CANDIDATE';
export const SET_FILTER = 'SET_FILTER_CANDIDATE';
export const SET_PAGE = 'SET_PAGE_CANDIDATE';
export const CHANGE_PAGE = 'CHANGE_PAGE_CANDIDATE';
export const CHANGE_STATUS= 'CHANGE_STATE_CANDIDATE';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_CANDIDATE';
export const CREATE_DATA = 'CREATE_CANDIDATE';
export const UPDATE_DATA = 'UPDATE_CANDIDATE';
export const DELETE_ITEM = 'DELETE_CANDIDATE';


export function actionFetchCandidate(index = 1, sorting = {}, filter = {}) {
    const request = serviceGetCandidate({ index, row: sorting.row, order: sorting.order, ...filter });
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

export function actionCreateCandidate(data) {
    const request = serviceCreateCandidate(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateCandidate(data) {
    const request = serviceUpdateCandidate(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteCandidate(id) {
    const request = serviceDeleteCandidate({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageCandidate(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}


export function actionFilterCandidate(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusCandidate(id, status) {
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterCandidate() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageCandidate(page) {
    const stateData = store.getState().candidate;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data; 
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchCandidate(serverPage + 1, sortingData, {query, query_data: queryData}));
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };

}
