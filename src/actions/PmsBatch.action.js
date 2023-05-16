import store from '../store';
import Constants from '../config/constants';
import {serviceCreatePmsBatch, serviceGetPmsBatch, serviceUpdatePmsBatch,serviceDeletePmsBatch} from "../services/PmsBatch.service";
import EventEmitter from "../libs/Events.utils";


export const FETCH_INIT = 'FETCH_INIT_PMS_BATCH';
export const FETCHED = 'FETCHED_PMS_BATCH';
export const FETCHED_FAIL = 'FETCHED_FAIL_PMS_BATCH';
export const FETCHED_FILTER = 'FETCHED_FILTER_PMS_BATCH';
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = 'FETCH_NEXT_PMS_BATCH';
export const FILTER = 'FILTER_PMS_BATCH';
export const RESET_FILTER = 'RESET_FILTER_PMS_BATCH';
export const SET_SORTING = 'SET_SORTING_PMS_BATCH';
export const SET_FILTER = 'SET_FILTER_PMS_BATCH';
export const SET_PAGE = 'SET_PAGE_PMS_BATCH';
export const CHANGE_PAGE = 'CHANGE_PAGE_PMS_BATCH';
export const CHANGE_STATUS= 'CHANGE_STATE_PMS_BATCH';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_PMS_BATCH';
export const CREATE_DATA = 'CREATE_PMS_BATCH';
export const UPDATE_DATA = 'UPDATE_PMS_BATCH';
export const DELETE_ITEM = 'DELETE_PMS_BATCH';


export function actionFetchPmsBatch(index = 1, sorting = {}, filter = {}, otherData = {}) {
    const request = serviceGetPmsBatch({ index, row: sorting.row, order: sorting.order, ...filter, ...otherData });
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

export function actionCreatePmsBatch(data) {
    const request = serviceCreatePmsBatch(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdatePmsBatch(data) {
    const request = serviceUpdatePmsBatch(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeletePmsBatch(id) {
    const request = serviceDeletePmsBatch({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePagePmsBatch(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}


export function actionFilterPmsBatch(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusPmsBatch(id, status) {
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterPmsBatch() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPagePmsBatch(page) {
    const stateData = store.getState().pmsBatch;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchPmsBatch(serverPage + 1, sortingData, {query, query_data: queryData}));
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };

}
