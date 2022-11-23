/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2019.
 */

import {serviceFetchCountries, serviceUpdateCountries,serviceCreateCountries} from '../services/Countries.service';
// import { fetchPRequests } from '../services/User.service';
import store from '../store';
import Constants from '../config/constants';
import EventEmitter from '../libs/Events.utils'

export const FETCH_INIT = 'FETCH_INIT_COUNTRIES';
export const FETCHED = 'FETCHED_COUNTRIES';
export const FETCHED_FAIL = 'FETCHED_FAIL_COUNTRIES';
export const FETCHED_FILTER = 'FETCHED_FILTER_COUNTRIES';
// export const NEXT_COUNTRIES = 'NEXT_COUNTRIES';
// export const PREV_COUNTRIES = 'PREV_COUNTRIES';
export const FETCH_NEXT = 'FETCH_NEXT_COUNTRIES';
export const FILTER = 'FILTER_COUNTRIES';
export const RESET_FILTER = 'RESET_FILTER_COUNTRIES';
export const SET_SORTING = 'SET_SORTING_COUNTRIES';
export const SET_FILTER = 'SET_FILTER_COUNTRIES';
export const SET_PAGE = 'SET_PAGE_COUNTRIES';
export const CHANGE_PAGE = 'CHANGE_PAGE_COUNTRIES';
export const CHANGE_STATUS= 'CHANGE_STATE_COUNTRIES';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_COUNTRIES';
export const CREATE_DATA = 'CREATE_COUNTRIES';
export const UPDATE_DATA = 'UPDATE_COUNTRIES';

export function actionFetchCountries(index = 1, sorting = {}, filter = {}, shouldReset=false) {
    const request = serviceFetchCountries({ index, row: sorting.row, order: sorting.order, ...filter });
    return (dispatch) => {
        if (shouldReset) {
            dispatch({
                type: CHANGE_PAGE,
                payload: 1,
            });
        }
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            console.log(data)
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


export function actionChangePageCountries(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
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

export function actionFilterCountries(value) {
    const request = serviceFetchCountries(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}


export function actionChangeStatusCountries(params) {
    const request = serviceUpdateCountries(params);
    if(params.type == 'APPROVE'){
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Approved', type: 'success'});
    }
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                if (params.id) {
                    dispatch({type: CHANGE_STATUS, payload: params.id});
                }
            }
        });
    };
}

export function actionResetFilterCountries() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageCountries(page) {
    const stateData = store.getState().provider_requests;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchCountries(serverPage + 1, sortingData, {query, query_data: queryData}));
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

export function actionCreateCountries(data) {
    const request = serviceCreateCountries(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateCountries(data) {
    const request = serviceUpdateCountries(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

