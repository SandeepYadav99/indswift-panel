
// import { serviceFetchProviderRequests } from '../services/ProviderRequest.service';
import store from '../store';
import Constants from '../config/constants';
import {
    serviceCreateDesignation,
    serviceDeleteDesignation,
    serviceGetDesignation,
    serviceUpdateDesignation
} from "../services/Designation.service";

export const FETCH_INIT = 'FETCH_INIT_DESIGNATION';
export const FETCHED = 'FETCHED_DESIGNATION';
export const FETCHED_FAIL = 'FETCHED_FAIL_DESIGNATION';
export const FETCHED_FILTER = 'FETCHED_FILTER_DESIGNATION';
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = 'FETCH_NEXT_DESIGNATION';
export const FILTER = 'FILTER_DESIGNATION';
export const RESET_FILTER = 'RESET_FILTER_DESIGNATION';
export const SET_SORTING = 'SET_SORTING_DESIGNATION';
export const SET_FILTER = 'SET_FILTER_DESIGNATION';
export const SET_PAGE = 'SET_PAGE_DESIGNATION';
export const CHANGE_PAGE = 'CHANGE_PAGE_DESIGNATION';
export const CHANGE_STATUS= 'CHANGE_STATE_DESIGNATION';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_DESIGNATION';
export const CREATE_DATA = 'CREATE_DESIGNATION';
export const UPDATE_DATA = 'UPDATE_DESIGNATION';
export const DELETE_ITEM = 'DELETE_SUBDESIGNATION';

export function actionFetchDesignation(index = 1, sorting = {}, filter = {}, shouldReset=false) {
    const request = serviceGetDesignation({ index, row: sorting.row , order: sorting.order, ...filter }); // GetDesignation
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

export function actionCreateDesignation(data) {
    const request = serviceCreateDesignation(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateDesignation(data) {
    const request = serviceUpdateDesignation(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteDesignation(id) {
    const request = serviceDeleteDesignation({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageDesignation(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}

export function actionFilterDesignation(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}


export function actionChangeStatusDesignation(id, status) {
    //const request = serviceUpdateDesignation({ id: params.id, status: params.type});
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterDesignation() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageDesignation(page) {
    const stateData = store.getState().designation;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchDesignation(serverPage + 1, sortingData, {query, query_data: queryData}));
        // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };

}
