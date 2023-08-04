import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateNewEmployeeList,
  serviceGetNewEmployeeList,
  serviceUpdateNewEmployeeList,
} from "../services/NewEmployeeList.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_NEW_EMPLOYEE";
export const FETCHED = "FETCHED_NEW_EMPLOYEE";
export const FETCHED_FAIL = "FETCHED_FAIL_NEW_EMPLOYEE";
export const FETCHED_FILTER = "FETCHED_FILTER_NEW_EMPLOYEE";
export const FETCH_NEXT = "FETCH_NEXT_NEW_EMPLOYEE";
export const FILTER = "FILTER_NEW_EMPLOYEE";
export const RESET_FILTER = "RESET_FILTER_NEW_EMPLOYEE";
export const SET_SORTING = "SET_SORTING_NEW_EMPLOYEE";
export const SET_FILTER = "SET_FILTER_NEW_EMPLOYEE";
export const SET_PAGE = "SET_PAGE_NEW_EMPLOYEE";
export const CHANGE_PAGE = "CHANGE_PAGE_NEW_EMPLOYEE";
export const CHANGE_STATUS = "CHANGE_STATE_NEW_EMPLOYEE";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_NEW_EMPLOYEE";
export const CREATE_DATA = "CREATE_NEW_EMPLOYEE";
export const UPDATE_DATA = "UPDATE_NEW_EMPLOYEE";
export const DELETE_ITEM = "DELETE_NEW_EMPLOYEE";
export const SET_OTHER_DATA = "SET_OTHER_DATA_NEW_EMPLOYEE";

export function actionFetchNewEmployeeList(
  index = 1,
  sorting = {},
  filter = {},
  otherData = {}
) {
  const request = serviceGetNewEmployeeList({
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
  const request = serviceCreateNewEmployeeList(data);
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

export function actionUpdateNewEmployeeList(data) {
  const request = serviceUpdateNewEmployeeList(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionChangePageNewEmployeeList(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterNewEmployeeList(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusNewEmployeeList(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterNewEmployeeList() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageNewEmployeeList(page) {
  const stateData = store.getState().newEmployee;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  const otherData = stateData.other_data;
  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchNewEmployeeList(
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
