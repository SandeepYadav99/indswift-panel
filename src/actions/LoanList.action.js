import store from '../store';
import Constants from '../config/constants';
import { serviceGetLoanList} from "../services/LoanList.service";


export const FETCH_INIT = 'FETCH_INIT_ LOAN_LIST';
export const FETCHED = 'FETCHED_   LOAN_LIST';
export const FETCHED_FAIL = 'FETCHED_FAIL_ LOAN_LIST';
export const FETCHED_FILTER = 'FETCHED_FILTER_ LOAN_LIST';
export const FETCH_NEXT = 'FETCH_NEXT_ LOAN_LIST';
export const FILTER = 'FILTER_ LOAN_LIST'; 
export const RESET_FILTER = 'RESET_FILTER_ LOAN_LIST';
export const SET_SORTING = 'SET_SORTING_   LOAN_LIST';
export const SET_FILTER = 'SET_FILTER_ LOAN_LIST';
export const SET_PAGE = 'SET_PAGE_ LOAN_LIST';
export const CHANGE_PAGE = 'CHANGE_PAGE_   LOAN_LIST';
export const CHANGE_STATUS= 'CHANGE_STATE_ LOAN_LIST';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_   LOAN_LIST';
export const CREATE_DATA = 'CREATE_LOAN_LIST';
export const UPDATE_DATA = 'UPDATE_LOAN_LIST';
export const DELETE_ITEM = 'DELETE_LOAN_LIST';


export function actionFetchLoanList(index = 1, sorting = {}, filter = {}) {
    const request = serviceGetLoanList({ index, row: sorting.row, order: sorting.order, ...filter });
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

export function actionChangePageLoanList(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}


export function actionFilterLoanList(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusLoanList(id, status) {
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterLoanList() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageLoanList(page) {
    const stateData = store.getState().loanList;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data; 
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchLoanList(serverPage + 1, sortingData, {query, query_data: queryData}));
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };

}
