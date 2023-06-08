import store from '../store';
import Constants from '../config/constants';
import {serviceCreateTravelAuth, serviceGetTravelAuth, serviceUpdateTravelAuth,serviceDeleteTravelAuth} from "../services/TravelAuth.service";
import EventEmitter from "../libs/Events.utils";


export const FETCH_INIT = 'FETCH_INIT_TRAVEL_AUTH';
export const FETCHED = 'FETCHED_TRAVEL_AUTH';
export const FETCHED_FAIL = 'FETCHED_FAIL_TRAVEL_AUTH';
export const FETCHED_FILTER = 'FETCHED_FILTER_TRAVEL_AUTH';
export const FETCH_NEXT = 'FETCH_NEXT_TRAVEL_AUTH';
export const FILTER = 'FILTER_TRAVEL_AUTH'; 
export const RESET_FILTER = 'RESET_FILTER_TRAVEL_AUTH';
export const SET_SORTING = 'SET_SORTING_TRAVEL_AUTH';
export const SET_FILTER = 'SET_FILTER_TRAVEL_AUTH';
export const SET_PAGE = 'SET_PAGE_TRAVEL_AUTH';
export const CHANGE_PAGE = 'CHANGE_PAGE_TRAVEL_AUTH';
export const CHANGE_STATUS= 'CHANGE_STATE_TRAVEL_AUTH';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_TRAVEL_AUTH';
export const CREATE_DATA = 'CREATE_TRAVEL_AUTH';
export const UPDATE_DATA = 'UPDATE_TRAVEL_AUTH';
export const DELETE_ITEM = 'DELETE_TRAVEL_AUTH';


export function actionFetchTravelAuth(index = 1, sorting = {}, filter = {}) {
    const request = serviceGetTravelAuth({ index, row: sorting.row, order: sorting.order, ...filter });
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

export function actionCreateTravelAuth(data) {
    const request = serviceCreateTravelAuth(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateTravelAuth(data) {
    const request = serviceUpdateTravelAuth(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteTravelAuth(id) {
    const request = serviceDeleteTravelAuth({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageTravelAuth(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}


export function actionFilterTravelAuth(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusTravelAuth(id, status) {
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterTravelAuth() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageTravelAuth(page) {
    const stateData = store.getState().travelAuth;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data; 
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchTravelAuth(serverPage + 1, sortingData, {query, query_data: queryData}));
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };

}
