import store from '../store';
import Constants from '../config/constants';
import {
    serviceCreateCircular,
    serviceDeleteCircular,
    serviceGetCircular,
    serviceUpdateCircular
} from "../services/Circular.service";

export const FETCH_INIT = 'FETCH_INIT_Circular';
export const FETCHED = 'FETCHED_Circular';
export const FETCHED_FAIL = 'FETCHED_FAIL_Circular';
export const FETCHED_FILTER = 'FETCHED_FILTER_Circular';
export const FETCH_NEXT = 'FETCH_NEXT_Circular';
export const FILTER = 'FILTER_Circular';
export const RESET_FILTER = 'RESET_FILTER_Circular';
export const SET_SORTING = 'SET_SORTING_Circular';
export const SET_FILTER = 'SET_FILTER_Circular';
export const SET_PAGE = 'SET_PAGE_Circular';
export const CHANGE_PAGE = 'CHANGE_PAGE_Circular';
export const CHANGE_STATUS= 'CHANGE_STATE_Circular';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_Circular';
export const CREATE_DATA = 'CREATE_Circular';
export const UPDATE_DATA = 'UPDATE_Circular';
export const DELETE_ITEM = 'DELETE_SUBCircular';

export function actionFetchCircular(index = 1, sorting = {}, filter = {}, shouldReset=false) {
    const request = serviceGetCircular({ index, row: sorting.row , order: sorting.order, ...filter }); // GetCircular
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

export function actionCreateCircular(data) {
    const request = serviceCreateCircular(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateCircular(data) {
    const request = serviceUpdateCircular(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteCircular(id) {
    const request = serviceDeleteCircular({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageCircular(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}

export function actionFilterCircular(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}


export function actionChangeStatusCircular(id, status) {
    //const request = serviceUpdateCircular({ id: params.id, status: params.type});
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterCircular() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageCircular(page) {
    const stateData = store.getState().Circular;
    const currentPage = stateData?.currentPage;
    const totalLength = stateData?.all.length;
    const sortingData = stateData?.sorting_data;
    const query = stateData?.query;
    const queryData = stateData?.query_data;
    const serverPage = stateData?.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchCircular(serverPage + 1, sortingData, {query, query_data: queryData}));
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };
    

}
