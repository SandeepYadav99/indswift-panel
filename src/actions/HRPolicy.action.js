import store from '../store';
import Constants from '../config/constants';
import {
    serviceCreateHRPolicy,
    serviceDeleteHRPolicy,
    serviceGetHRPolicy,
    serviceUpdateHRPolicy
} from "../services/HRPolicy.service";

export const FETCH_INIT = 'FETCH_INIT_HRPolicy';
export const FETCHED = 'FETCHED_HRPolicy';
export const FETCHED_FAIL = 'FETCHED_FAIL_HRPolicy';
export const FETCHED_FILTER = 'FETCHED_FILTER_HRPolicy';
export const FETCH_NEXT = 'FETCH_NEXT_HRPolicy';
export const FILTER = 'FILTER_HRPolicy';
export const RESET_FILTER = 'RESET_FILTER_HRPolicy';
export const SET_SORTING = 'SET_SORTING_HRPolicy';
export const SET_FILTER = 'SET_FILTER_HRPolicy';
export const SET_PAGE = 'SET_PAGE_HRPolicy';
export const CHANGE_PAGE = 'CHANGE_PAGE_HRPolicy';
export const CHANGE_STATUS= 'CHANGE_STATE_HRPolicy';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_HRPolicy';
export const CREATE_DATA = 'CREATE_HRPolicy';
export const UPDATE_DATA = 'UPDATE_HRPolicy';
export const DELETE_ITEM = 'DELETE_SUBHRPolicy';

export function actionFetchHRPolicy(index = 1, sorting = {}, filter = {}, shouldReset=false) {
    const request = serviceGetHRPolicy({ index, row: sorting.row , order: sorting.order, ...filter }); // GetHRPolicy
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

export function actionCreateHRPolicy(data) {
    const request = serviceCreateHRPolicy(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateHRPolicy(data) {
    const request = serviceUpdateHRPolicy(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteHRPolicy(id) {
    const request = serviceDeleteHRPolicy({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageHRPolicy(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}

export function actionFilterHRPolicy(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}


export function actionChangeStatusHRPolicy(id, status) {
    //const request = serviceUpdateHRPolicy({ id: params.id, status: params.type});
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterHRPolicy() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageHRPolicy(page) {
    const stateData = store.getState().HRPolicy;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchHRPolicy(serverPage + 1, sortingData, {query, query_data: queryData}));
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };
    

}
