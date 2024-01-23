import store from "../store";
import Constants from "../config/constants";
import {serviceGetNotificationModule,serviceCreateNotificationModule} from "../services/NotificationModule.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_NOTIFICATIONMODULE";
export const FETCHED = "FETCHED_NOTIFICATIONMODULE";
export const FETCHED_FAIL = "FETCHED_FAIL_NOTIFICATIONMODULE";
export const FETCHED_FILTER = "FETCHED_FILTER_NOTIFICATIONMODULE";
export const FETCH_NEXT = "FETCH_NEXT_NOTIFICATIONMODULE";
export const FILTER = "FILTER_NOTIFICATIONMODULE";
export const RESET_FILTER = "RESET_FILTER_NOTIFICATIONMODULE";
export const SET_SORTING = "SET_SORTING_NOTIFICATIONMODULE";
export const SET_FILTER = "SET_FILTER_NOTIFICATIONMODULE";
export const SET_PAGE = "SET_PAGE_NOTIFICATIONMODULE";
export const CHANGE_PAGE = "CHANGE_PAGE_NOTIFICATIONMODULE";
export const CHANGE_STATUS = "CHANGE_STATE_NOTIFICATIONMODULE";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_NOTIFICATIONMODULE";
export const CREATE_DATA = "CREATE_NOTIFICATIONMODULE";
export const UPDATE_DATA = "UPDATE_NOTIFICATIONMODULE";
export const DELETE_ITEM = "DELETE_NOTIFICATIONMODULE";

export function actionFetchNotificationModule(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetNotificationModule({
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


export function actionCreateNotificationModule(data) {
  const request = serviceCreateNotificationModule(data);
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

export function actionUpdateNotificationModule(data) {
  const request = serviceCreateNotificationModule(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}


export function actionChangePageNotificationModule(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterNotificationModule(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusNotificationModule(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterNotificationModule() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageNotificationModule(page) {
  const stateData = store.getState().notification_module;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
        actionFetchNotificationModule(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
      })
    );
  }

  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
