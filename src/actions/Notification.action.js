import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateNotification,
  serviceGetNotification,
  serviceUpdateNotification,
  serviceDeleteNotification,
} from "../services/Notification.services";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_NOTIFICATION";
export const FETCHED = "FETCHED_NOTIFICATION";
export const FETCHED_FAIL = "FETCHED_FAIL_NOTIFICATION";
export const FETCHED_FILTER = "FETCHED_FILTER_NOTIFICATION";
export const FETCH_NEXT = "FETCH_NEXT_NOTIFICATION";
export const FILTER = "FILTER_NOTIFICATION";
export const RESET_FILTER = "RESET_FILTER_NOTIFICATION";
export const SET_SORTING = "SET_SORTING_NOTIFICATION";
export const SET_FILTER = "SET_FILTER_NOTIFICATION";
export const SET_PAGE = "SET_PAGE_NOTIFICATION";
export const CHANGE_PAGE = "CHANGE_PAGE_NOTIFICATION";
export const CHANGE_STATUS = "CHANGE_STATE_NOTIFICATION";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_NOTIFICATION";
export const CREATE_DATA = "CREATE_NOTIFICATION";
export const UPDATE_DATA = "UPDATE_NOTIFICATION";
export const DELETE_ITEM = "DELETE_NOTIFICATION";

export function actionFetchNotification(page = 0, sorting = {}, filter = {}) {
  const request = serviceGetNotification({
    page,
  });
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: SET_FILTER, payload: filter });
      dispatch({ type: SET_SORTING, payload: sorting });
      if (!data.error) {
        dispatch({ type: FETCHED, payload: { data: data.data, page: page } });
        dispatch({ type: SET_SERVER_PAGE, payload: page });
        if (page == 1) {
          dispatch({ type: CHANGE_PAGE, payload: page - 1 });
        }
      } else {
        dispatch({ type: FETCHED_FAIL, payload: null });
      }
    });
  };
}


export function actionCreateNotification(data) {
  const request = serviceCreateNotification(data);
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

export function actionUpdateNotification(data) {
  const request = serviceUpdateNotification(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteNotification(id) {
  const request = serviceDeleteNotification({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageNotification(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterNotification(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}
export function actionLeaveCount(data) {
  const request = serviceCreateNotification(data);
  return (dispatch) => {
    request.then((data) => {
      dispatch({ type: FETCHED, payload: data });
    });
  };
}
export function actionLeaveList(data) {
  const request = serviceCreateNotification(data);
  return (dispatch) => {
    request.then((data) => {
      dispatch({ type: FETCHED, payload: data });
    });
  };
}
export function actionChangeStatusNotification(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterNotification() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageNotification(page) {
  const stateData = store.getState().notification;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
        actionFetchNotification(serverPage + 1, sortingData, {
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
