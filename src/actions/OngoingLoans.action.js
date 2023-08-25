import store from "../store";
import Constants from "../config/constants";
import { serviceGetOngoingLoans } from "../services/OngoingLoans.service";

export const FETCH_INIT = "FETCH_INIT_ONGOING_LOANS";
export const FETCHED = "FETCHED_ONGOING_LOANS";
export const FETCHED_FAIL = "FETCHED_FAIL_ONGOING_LOANS";
export const FETCHED_FILTER = "FETCHED_FILTER_ONGOING_LOANS";
export const FETCH_NEXT = "FETCH_NEXT_ONGOING_LOANS";
export const FILTER = "FILTER_ONGOING_LOANS";
export const RESET_FILTER = "RESET_FILTER_ONGOING_LOANS";
export const SET_SORTING = "SET_SORTING_  ONGOING_LOANS";
export const SET_FILTER = "SET_FILTER_ONGOING_LOANS";
export const SET_PAGE = "SET_PAGE_ONGOING_LOANS";
export const CHANGE_PAGE = "CHANGE_PAGE_  ONGOING_LOANS";
export const CHANGE_STATUS = "CHANGE_STATE_ONGOING_LOANS";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_  ONGOING_LOANS";
export const CREATE_DATA = "CREATE_ONGOING_LOANS";
export const UPDATE_DATA = "UPDATE_ONGOING_LOANS";
export const DELETE_ITEM = "DELETE_ONGOING_LOANS";

export function actionFetchOngoingLoans(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetOngoingLoans({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  });
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: SET_FILTER, payload: filter });
      dispatch({ type: SET_SORTING, payload: sorting });
      if (!data.error) {
        dispatch({ type: FETCHED, payload: { data: data.data, page: index } });
        dispatch({ type: SET_SERVER_PAGE, payload: index });
        if (index == 1) {
          dispatch({ type: CHANGE_PAGE, payload: index - 1 });
        }
      } else {
        dispatch({ type: FETCHED_FAIL, payload: null });
      }
    });
  };
}

export function actionChangePageOngoingLoans(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterOngoingLoans(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusOngoingLoans(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterOngoingLoans() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageOngoingLoans(page) {
  const stateData = store.getState().OngoingLoans;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchOngoingLoans(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
      })
    );
  }

  console.log(currentPage, totalLength);
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
