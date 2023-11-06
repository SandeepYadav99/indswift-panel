import {
  serviceLeaveList,
  serviceLeaveCount,
  serviceLeaveDataList,
} from "../services/Leave.service";

export const LIST_LEAVE = "LIST_LEAVE";
export const COUNT_LEAVE = "COUNT_LEAVE";
export const LEAVES_DATA = "LEAVES_DATA";
export const FETCH_INIT = "FETCH_INIT";
export const SET_FILTER = "SET_FILTER";
export const SET_SORTING = "SET_SORTING";
export const FETCHED = "FETCHED";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const FETCHED_FAIL = "FETCHED_FAIL";
export const CHANGE_STATUS ="CHANGE_STATUS";
export const CREATE_DATA ="CREATE_DATA";
export const UPDATE_DATA = "UPDATE_DATE";

export function actionFetchLeave(index = 1, sorting = {}, filter = {}) {
  const request = serviceLeaveList({
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

export function actionFetchLeaveReview(index = 1, sorting = {}, filter = {}) {
  const request = serviceLeaveDataList({
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


export function actionLeaveList(data) {
  const request = serviceLeaveList(data);
  return (dispatch) => {
    request.then((data) => {
      dispatch({ type: LIST_LEAVE, payload: data });
    });
  };
}

export function actionLeaveCount(data) {
  const request = serviceLeaveCount(data);
  return (dispatch) => {
    request.then((data) => {
      dispatch({ type: COUNT_LEAVE, payload: data });
    });
  };
}

export function actionLeavesListData(data) {
  const request = serviceLeaveDataList(data);
  return (dispatch) => {
    request.then((data) => {
      dispatch({ type: LEAVES_DATA, payload: data });
    });
  };
}
