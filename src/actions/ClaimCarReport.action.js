import store from '../store';
import Constants from '../config/constants';
import {serviceCreateClaimCarReport, serviceGetClaimCarReport, serviceUpdateClaimCarReport,serviceDeleteClaimCarReport} from "../services/ClaimCarReport.service";
import EventEmitter from "../libs/Events.utils";


export const FETCH_INIT = 'FETCH_INIT_CLAIMS_CAR_REPORT';
export const FETCHED = 'FETCHED_CLAIMS_CAR_REPORT';
export const FETCHED_FAIL = 'FETCHED_FAIL_CLAIMS_CAR_REPORT';
export const FETCHED_FILTER = 'FETCHED_FILTER_CLAIMS_CAR_REPORT';
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = 'FETCH_NEXT_CLAIMS_CAR_REPORT';
export const FILTER = 'FILTER_CLAIMS_CAR_REPORT'; 
export const RESET_FILTER = 'RESET_FILTER_CLAIMS_CAR_REPORT';
export const SET_SORTING = 'SET_SORTING_CLAIMS_CAR_REPORT';
export const SET_FILTER = 'SET_FILTER_CLAIMS_CAR_REPORT';
export const SET_PAGE = 'SET_PAGE_CLAIMS_CAR_REPORT';
export const CHANGE_PAGE = 'CHANGE_PAGE_CLAIMS_CAR_REPORT';
export const CHANGE_STATUS= 'CHANGE_STATE_CLAIMS_CAR_REPORT';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_CLAIMS_CAR_REPORT';
export const CREATE_DATA = 'CREATE_CLAIMS_CAR_REPORT';
export const UPDATE_DATA = 'UPDATE_CLAIMS_CAR_REPORT';
export const DELETE_ITEM = 'DELETE_CLAIMS_CAR_REPORT';


export function actionFetchClaimCarReport(index = 1, sorting = {}, filter = {}) {
    const request = serviceGetClaimCarReport({ index, row: sorting.row, order: sorting.order, ...filter });
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

export function actionCreateClaimCarReport(data) {
    const request = serviceCreateClaimCarReport(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateClaimCarReport(data) {
    const request = serviceUpdateClaimCarReport(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteClaimCarReport(id) {
    const request = serviceDeleteClaimCarReport({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageClaimCarReport(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}


export function actionFilterClaimCarReport(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusClaimCarReport(id, status) {
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterClaimCarReport() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageClaimCarReport(page) {
    const stateData = store.getState().claimCarReport;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data; 
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchClaimCarReport(serverPage + 1, sortingData, {query, query_data: queryData}));
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };

}
