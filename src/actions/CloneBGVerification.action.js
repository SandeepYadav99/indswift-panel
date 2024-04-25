import store from "../store";
import Constants from "../config/constants";

import {
  serviceEmployeeCloneBGVList,
  serviceEmployeeCloneBGVCreate,
  serviceEmployeeCloneBGVUpdate,
} from "../services/CloneBGVerification.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_CLONE_PENDING_BGV";
export const FETCHED = "FETCHED_CLONE_PENDING_BGV";
export const FETCHED_FAIL = "FETCHED_FAIL_CLONE_PENDING_BGV";
export const FETCHED_FILTER = "FETCHED_FILTER_CLONE_PENDING_BGV";
export const FETCH_NEXT = "FETCH_NEXT_CLONE_PENDING_BGV";
export const FILTER = "FILTER_CLONE_PENDING_BGV";
export const RESET_FILTER = "RESET_FILTER_CLONE_PENDING_BGV";
export const SET_SORTING = "SET_SORTING_CLONE_PENDING_BGV";
export const SET_FILTER = "SET_FILTER_CLONE_PENDING_BGV";
export const SET_PAGE = "SET_PAGE_CLONE_PENDING_BGV";
export const CHANGE_PAGE = "CHANGE_PAGE_CLONE_PENDING_BGV";
export const CHANGE_STATUS = "CHANGE_STATE_CLONE_PENDING_BGV";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_CLONE_PENDING_BGV";
export const CREATE_DATA = "CREATE_CLONE_PENDING_BGV";
export const UPDATE_DATA = "UPDATE_CLONE_PENDING_BGV";
export const DELETE_ITEM = "DELETE_CLONE_PENDING_BGV";
export const SET_OTHER_DATA = "SET_OTHER_DATA_CLONE_PENDING_BGV";

export function actionFetchCloneBGVList(
  index = 1,
  sorting = {},
  filter = {},
  otherData = {}
) {
  const request = serviceEmployeeCloneBGVList({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
    ...otherData,
  });
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: SET_FILTER, payload: filter });
      dispatch({ type: SET_SORTING, payload: sorting });
      if (Object.keys(otherData).length > 0) {
        dispatch({ type: SET_OTHER_DATA, payload: otherData });
      } else {
        dispatch({ type: SET_OTHER_DATA, payload: {} });
      }
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

export function actionCreateNewEmployeeList(data) {
  const request = serviceEmployeeCloneBGVCreate(data);
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

export function actionUpdateCloneBGVList(data) {
  const request = serviceEmployeeCloneBGVUpdate(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionChangePageCloneBGVList(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterCloneBGVList(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusCloneBGVList(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterCloneBGVList() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageCloneBGVList(page) {
  const stateData = store.getState().clone_pendingBGV;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  const otherData = stateData.other_data;
  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchCloneBGVList(
        serverPage + 1,
        sortingData,
        { query, query_data: queryData },
        otherData
      )
    );
  }

  console.log(currentPage, totalLength);
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
