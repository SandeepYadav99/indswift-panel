import store from "../store";
import {
  serviceCreateImprest,
  serviceGetImprest,
  serviceUpdateImprest,
  serviceDeleteImprest,
} from "../services/Imprest.service";
import EventEmitter from "../libs/Events.utils";
import constants from "../config/constants";

export const FETCH_INIT = "FETCH_INIT_IMPREST";
export const FETCHED = "FETCHED_IMPREST";
export const FETCHED_FAIL = "FETCHED_FAIL_IMPREST";
export const FETCHED_FILTER = "FETCHED_FILTER_IMPREST";

export const FETCH_NEXT = "FETCH_NEXT_IMPREST";
export const FILTER = "FILTER_IMPREST";
export const RESET_FILTER = "RESET_FILTER_IMPREST";
export const SET_SORTING = "SET_SORTING_IMPREST";
export const SET_FILTER = "SET_FILTER_IMPREST";
export const SET_PAGE = "SET_PAGE_IMPREST";
export const CHANGE_PAGE = "CHANGE_PAGE_IMPREST";
export const CHANGE_STATUS = "CHANGE_STATE_IMPREST";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_IMPREST";
export const CREATE_DATA = "CREATE_IMPREST";
export const UPDATE_DATA = "UPDATE_IMPREST";
export const DELETE_ITEM = "DELETE_IMPREST";

export function actionFetchImprest(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetImprest({
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

export function actionCreateImprest(data) {
  const request = serviceCreateImprest(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          error: "Saved",
          type: "success",
        });
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateImprest(data) {
  const request = serviceUpdateImprest(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteImprest(id) {
  const request = serviceDeleteImprest({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageImprest(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterImprest(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusImprest(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterImprest() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageImprest(page) {
  const stateData = store.getState().imprest;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * constants.PAGE_VALUE) {
    store.dispatch(
      actionFetchImprest(serverPage + 1, sortingData, {
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
