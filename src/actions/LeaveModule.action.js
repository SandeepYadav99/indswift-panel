import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateLeaveModule,
  serviceGetLeaveModule,
  serviceUpdateLeaveModule,
  serviceDeleteLeaveModule,
} from "../services/Leave.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_LEAVE_MODULE";
export const FETCHED = "FETCHED_LEAVE_MODULE";
export const FETCHED_FAIL = "FETCHED_FAIL_LEAVE_MODULE";
export const FETCHED_FILTER = "FETCHED_FILTER_LEAVE_MODULE";
export const FETCH_NEXT = "FETCH_NEXT_LEAVE_MODULE";
export const FILTER = "FILTER_LEAVE_MODULE";
export const RESET_FILTER = "RESET_FILTER_LEAVE_MODULE";
export const SET_SORTING = "SET_SORTING_LEAVE_MODULE";
export const SET_FILTER = "SET_FILTER_LEAVE_MODULE";
export const SET_PAGE = "SET_PAGE_LEAVE_MODULE";
export const CHANGE_PAGE = "CHANGE_PAGE_LEAVE_MODULE";
export const CHANGE_STATUS = "CHANGE_STATE_LEAVE_MODULE";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_LEAVE_MODULE";
export const CREATE_DATA = "CREATE_LEAVE_MODULE";
export const UPDATE_DATA = "UPDATE_LEAVE_MODULE";
export const DELETE_ITEM = "DELETE_LEAVE_MODULE";

export function actionFetchLeaveModule(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetLeaveModule({
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


export function actionCreateLeaveModule(data) {
  const request = serviceCreateLeaveModule(data);
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

export function actionUpdateLeaveModule(data) {
  const request = serviceUpdateLeaveModule(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteLeaveModule(id) {
  const request = serviceDeleteLeaveModule({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageLeaveModule(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterLeaveModule(value) {
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
  const request = serviceCreateLeaveModule(data);
  return (dispatch) => {
    request.then((data) => {
      dispatch({ type: FETCHED, payload: data });
    });
  };
}
export function actionLeaveList(data) {
  const request = serviceCreateLeaveModule(data);
  return (dispatch) => {
    request.then((data) => {
      dispatch({ type: FETCHED, payload: data });
    });
  };
}
export function actionChangeStatusLeaveModule(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterLeaveModule() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageLeaveModule(page) {
  const stateData = store.getState().LeaveModule;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchLeaveModule(serverPage + 1, sortingData, {
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
