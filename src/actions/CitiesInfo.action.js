/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2019.
 */

import {serviceFetchCities, serviceUpdateCities, serviceCreateCities} from '../services/Cities.service';
// import { fetchPRequests } from '../services/User.service';
import store from '../store';
import Constants from '../config/constants';
import EventEmitter from '../libs/Events.utils'
import history from '../libs/history.utils';

export const FETCH_INIT = 'FETCH_INIT_CITIES';
export const FETCHED = 'FETCHED_CITIES';
export const FETCHED_FAIL = 'FETCHED_FAIL_CITIES';
export const FETCHED_FILTER = 'FETCHED_FILTER_CITIES';
// export const NEXT_CITIES = 'NEXT_CITIES';
// export const PREV_CITIES = 'PREV_CITIES';
export const FETCH_NEXT = 'FETCH_NEXT_CITIES';
export const FILTER = 'FILTER_CITIES';
export const RESET_FILTER = 'RESET_FILTER_CITIES';
export const SET_SORTING = 'SET_SORTING_CITIES';
export const SET_FILTER = 'SET_FILTER_CITIES';
export const SET_PAGE = 'SET_PAGE_CITIES';
export const CHANGE_PAGE = 'CHANGE_PAGE_CITIES';
export const CHANGE_STATUS = 'CHANGE_STATE_CITIES';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_CITIES';
export const CREATE_DATA = 'CREATE_CITIES';
export const UPDATE_DATA = 'UPDATE_CITIES';

export function actionFetchCities(index = 1, sorting = {}, filter = {}, shouldReset=false) {
    const {pathname} = history.location;
    const temp = pathname.split('/');
    const id = temp[temp.length - 1];
    const request = serviceFetchCities({region_id:id,index, row: sorting.row, order: sorting.order, ...filter});
    return (dispatch) => {
        if (shouldReset) {
            dispatch({
                type: CHANGE_PAGE,
                payload: 1,
            });
        }
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            console.log(data);
            dispatch({type: SET_FILTER, payload: filter});
            dispatch({type: SET_SORTING, payload: sorting});
            if (!data.error) {
                dispatch({type: FETCHED, payload: {data: data.data, page: index}});
                dispatch({type: SET_SERVER_PAGE, payload: index});
                if (index == 1) {
                    dispatch({type: CHANGE_PAGE, payload: index - 1});
                }
            } else {
                dispatch({type: FETCHED_FAIL, payload: null});
            }
        });
    };
}


export function actionChangePageCities(page) {
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

export function actionFilterCities(value) {
    const request = serviceFetchCities(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}


export function actionChangeStatusCities(params) {
    const request = serviceUpdateCities(params);
    if (params.type == 'APPROVE') {
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

export function actionResetFilterCities() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageCities(page) {
    const stateData = store.getState().cities;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchCities(serverPage + 1, sortingData, {query, query_data: queryData}));
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

export function actionCreateCities(data) {
    const request = serviceCreateCities(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data});
            }
        })
    }
}

export function actionUpdateCities(data) {
    const request = serviceUpdateCities(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data});
            }
        })
    }
}

