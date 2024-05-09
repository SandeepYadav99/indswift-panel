import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateCloneClaims,
  serviceGetCloneClaims,
  serviceUpdateCloneClaims,
  serviceDeleteCloneClaims,
} from "../services/CloneClaims.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_CLONE_CLAIMS";
export const FETCHED = "FETCHED_CLONE_CLAIMS";
export const FETCHED_FAIL = "FETCHED_FAIL_CLONE_CLAIMS";
export const FETCHED_FILTER = "FETCHED_FILTER_CLONE_CLAIMS";
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = "FETCH_NEXT_CLONE_CLAIMS";
export const FILTER = "FILTER_CLONE_CLAIMS";
export const RESET_FILTER = "RESET_FILTER_CLONE_CLAIMS";
export const SET_SORTING = "SET_SORTING_CLONE_CLAIMS";
export const SET_FILTER = "SET_FILTER_CLONE_CLAIMS";
export const SET_PAGE = "SET_PAGE_CLONE_CLAIMS";
export const CHANGE_PAGE = "CHANGE_PAGE_CLONE_CLAIMS";
export const CHANGE_STATUS = "CHANGE_STATE_CLONE_CLAIMS";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_CLONE_CLAIMS";
export const CREATE_DATA = "CREATE_CLONE_CLAIMS";
export const UPDATE_DATA = "UPDATE_CLONE_CLAIMS";
export const DELETE_ITEM = "DELETE_CLONE_CLAIMS";

export function actionFetchCloneClaims(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetCloneClaims({
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

export function actionCreateCloneClaims(data) {
  const request = serviceCreateCloneClaims(data);
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

export function actionUpdateCloneClaims(data) {
  const request = serviceUpdateCloneClaims(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteCloneClaims(id) {
  const request = serviceDeleteCloneClaims({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageCloneClaims(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterCloneClaims(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusCloneClaims(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterCloneClaims() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageCloneClaims(page) {
  const stateData = store.getState().clone_claims;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchCloneClaims(serverPage + 1, sortingData, {
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
