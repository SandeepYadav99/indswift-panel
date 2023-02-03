import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateHRKnowledge,
  serviceDeleteHRKnowledge,
  serviceGetHRKnowledge,
  serviceUpdateHRKnowledge,
} from "../services/HRKnowledge.service";

export const FETCH_INIT = "FETCH_INIT_HRKnowledge";
export const FETCHED = "FETCHED_HRKnowledge";
export const FETCHED_FAIL = "FETCHED_FAIL_HRKnowledge";
export const FETCHED_FILTER = "FETCHED_FILTER_HRKnowledge";
export const FETCH_NEXT = "FETCH_NEXT_HRKnowledge";
export const FILTER = "FILTER_HRKnowledge";
export const RESET_FILTER = "RESET_FILTER_HRKnowledge";
export const SET_SORTING = "SET_SORTING_HRKnowledge";
export const SET_FILTER = "SET_FILTER_HRKnowledge";
export const SET_PAGE = "SET_PAGE_HRKnowledge";
export const CHANGE_PAGE = "CHANGE_PAGE_HRKnowledge";
export const CHANGE_STATUS = "CHANGE_STATE_HRKnowledge";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_HRKnowledge";
export const CREATE_DATA = "CREATE_HRKnowledge";
export const UPDATE_DATA = "UPDATE_HRKnowledge";
export const DELETE_ITEM = "DELETE_SUBHRKnowledge";

export function actionFetchHRKnowledge(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetHRKnowledge({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetHRPolicy
  return (dispatch) => {
    if (shouldReset) {
      dispatch({
        type: CHANGE_PAGE,
        payload: 1,
      });
    }
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

export function actionCreateHRKnowledge(data) {
  const request = serviceCreateHRKnowledge(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateHRKnowledge(data) {
  const request = serviceUpdateHRKnowledge(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteHRKnowledge(id) {
  const request = serviceDeleteHRKnowledge({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageHRKnowledge(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterHRKnowledge(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusHRKnowledge(id, status) {
  //const request = serviceUpdateHRKnowledge({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterHRKnowledge() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageHRKnowledge(page) {
  const stateData = store.getState().HRKnowledge;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchHRKnowledge(serverPage + 1, sortingData, {
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
