import store from '../store';
import Constants from '../config/constants';
import {serviceCreateExitInterview, serviceGetCloneExitInterview, serviceUpdateExitInterview,serviceDeleteExitInterview} from "../services/ExitInterview.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = 'FETCH_INIT_CLONE_EXIT_INTERVIEW';
export const FETCHED = 'FETCHED_CLONE_EXIT_INTERVIEW';
export const FETCHED_FAIL = 'FETCHED_FAIL_CLONE_EXIT_INTERVIEW';
export const FETCHED_FILTER = 'FETCHED_FILTER_CLONE_EXIT_INTERVIEW';
export const FETCH_NEXT = 'FETCH_NEXT_CLONE_EXIT_INTERVIEW';
export const FILTER = 'FILTER_CLONE_EXIT_INTERVIEW'; 
export const RESET_FILTER = 'RESET_FILTER_CLONE_EXIT_INTERVIEW';
export const SET_SORTING = 'SET_SORTING_CLONE_EXIT_INTERVIEW';
export const SET_FILTER = 'SET_FILTER_CLONE_EXIT_INTERVIEW';
export const SET_PAGE = 'SET_PAGE_CLONE_EXIT_INTERVIEW';
export const CHANGE_PAGE = 'CHANGE_PAGE_CLONE_EXIT_INTERVIEW';
export const CHANGE_STATUS= 'CHANGE_STATE_CLONE_EXIT_INTERVIEW';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_CLONE_EXIT_INTERVIEW';
export const CREATE_DATA = 'CREATE_CLONE_EXIT_INTERVIEW';
export const UPDATE_DATA = 'UPDATE_CLONE_EXIT_INTERVIEW';
export const DELETE_ITEM = 'DELETE_CLONE_EXIT_INTERVIEW';


export function actionFetchCloneExitInterview(index = 1, sorting = {}, filter = {}) {
    const request = serviceGetCloneExitInterview({ index, row: sorting.row, order: sorting.order, ...filter });
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

export function actionCreateCloneExitInterview(data) {
    const request = serviceCreateExitInterview(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateCloneExitInterview(data) {
    const request = serviceUpdateExitInterview(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteCloneExitInterview(id) {
    const request = serviceDeleteExitInterview({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageCloneExitInterview(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}


export function actionFilterCloneExitInterview(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusCloneExitInterview(id, status) {
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterCloneExitInterview() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageCloneExitInterview(page) {
    const stateData = store.getState().clone_exit_interview;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data; 
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchCloneExitInterview(serverPage + 1, sortingData, {query, query_data: queryData}));
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };

}
