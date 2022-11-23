/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2019.
 */

import {serviceFetchCurrency, serviceUpdateCurrency,serviceCreateCurrency} from '../services/Currency.service';
// import { fetchPRequests } from '../services/User.service';
import store from '../store';
import Constants from '../config/constants';
import EventEmitter from '../libs/Events.utils'

export const FETCH_INIT = 'FETCH_INIT_CURRENCY';
export const FETCHED = 'FETCHED_CURRENCY';
export const FETCHED_FAIL = 'FETCHED_FAIL_CURRENCY';
export const FETCHED_FILTER = 'FETCHED_FILTER_CURRENCY';
// export const NEXT_CURRENCY = 'NEXT_CURRENCY';
// export const PREV_CURRENCY = 'PREV_CURRENCY';
export const FETCH_NEXT = 'FETCH_NEXT_CURRENCY';
export const FILTER = 'FILTER_CURRENCY';
export const RESET_FILTER = 'RESET_FILTER_CURRENCY';
export const SET_SORTING = 'SET_SORTING_CURRENCY';
export const SET_FILTER = 'SET_FILTER_CURRENCY';
export const SET_PAGE = 'SET_PAGE_CURRENCY';
export const CHANGE_PAGE = 'CHANGE_PAGE_CURRENCY';
export const CHANGE_STATUS= 'CHANGE_STATE_CURRENCY';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_CURRENCY';
export const CREATE_DATA = 'CREATE_CURRENCY';
export const UPDATE_DATA = 'UPDATE_CURRENCY';

export function actionFetchCurrency(index = 1, sorting = {}, filter = {}, shouldReset=false) {
    const request = serviceFetchCurrency({ index, row: sorting.row, order: sorting.order, ...filter });
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


export function actionChangePageCurrency(page) {
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

export function actionFilterCurrency(value) {
    const request = serviceFetchCurrency(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}


export function actionChangeStatusCurrency(params) {
    const request = serviceUpdateCurrency(params);
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

export function actionResetFilterCurrency() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageCurrency(page) {
    const stateData = store.getState().currency;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchCurrency(serverPage + 1, sortingData, {query, query_data: queryData}));
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

export function actionCreateCurrency(data) {
    const request = serviceCreateCurrency(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateCurrency(data) {
    const request = serviceUpdateCurrency(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

