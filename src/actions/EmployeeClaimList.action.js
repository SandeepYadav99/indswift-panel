import store from '../store';
import Constants from '../config/constants';
import {
    serviceCreateClaimList,
    serviceDeleteClaimList,
    serviceGetClaimList,
    serviceUpdateClaimList
} from "../services/EmployeeClaimList.service";

export const FETCH_INIT = 'FETCH_INIT_CLAIM_LIST';
export const FETCHED = 'FETCHED_CLAIM_LIST';
export const FETCHED_FAIL = 'FETCHED_FAIL_CLAIM_LIST';
export const FETCHED_FILTER = 'FETCHED_FILTER_CLAIM_LIST';
export const FETCH_NEXT = 'FETCH_NEXT_CLAIM_LIST';
export const FILTER = 'FILTER_CLAIM_LIST';
export const RESET_FILTER = 'RESET_FILTER_CLAIM_LIST';
export const SET_SORTING = 'SET_SORTING_CLAIM_LIST';
export const SET_FILTER = 'SET_FILTER_CLAIM_LIST';
export const SET_PAGE = 'SET_PAGE_CLAIM_LIST';
export const CHANGE_PAGE = 'CHANGE_PAGE_CLAIM_LIST';
export const CHANGE_STATUS= 'CHANGE_STATE_CLAIM_LIST';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_CLAIM_LIST';
export const CREATE_DATA = 'CREATE_CLAIM_LIST';
export const UPDATE_DATA = 'UPDATE_CLAIM_LIST';
export const DELETE_ITEM = 'DELETE_CLAIM_LIST';

export function actionFetchClaimList(index = 1, sorting = {}, filter = {}, shouldReset=false) {
    const request = serviceGetClaimList({ index, row: sorting.row , order: sorting.order, ...filter }); // GetClaimList
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

export function actionCreateClaimList(data) {
    const request = serviceCreateClaimList(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateClaimList(data) {
    const request = serviceUpdateClaimList(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteClaimList(id) {
    const request = serviceDeleteClaimList({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageClaimList(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}

export function actionFilterClaimList(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}

export function actionChangeStatusClaimList(id, status) {
    //const request = serviceUpdateClaimList({ id: params.id, status: params.type});
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterClaimList() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageClaimList(page) {
    const stateData = store.getState().location;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchClaimList(serverPage + 1, sortingData, {query, query_data: queryData}));
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };
}
