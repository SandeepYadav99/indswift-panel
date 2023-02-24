import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateHRAnnouncement,
  serviceDeleteHRAnnouncement,
  serviceGetHRAnnouncement,
  serviceUpdateHRAnnouncement,
} from "../services/HRAnnouncement.service";

export const FETCH_INIT = "FETCH_INIT_HRAnnouncement";
export const FETCHED = "FETCHED_HRAnnouncement";
export const FETCHED_FAIL = "FETCHED_FAIL_HRAnnouncement";
export const FETCHED_FILTER = "FETCHED_FILTER_HRAnnouncement";
export const FETCH_NEXT = "FETCH_NEXT_HRAnnouncement";
export const FILTER = "FILTER_HRAnnouncement";
export const RESET_FILTER = "RESET_FILTER_HRAnnouncement";
export const SET_SORTING = "SET_SORTING_HRAnnouncement";
export const SET_FILTER = "SET_FILTER_HRAnnouncement";
export const SET_PAGE = "SET_PAGE_HRAnnouncement";
export const CHANGE_PAGE = "CHANGE_PAGE_HRAnnouncement";
export const CHANGE_STATUS = "CHANGE_STATE_HRAnnouncement";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_HRAnnouncement";
export const CREATE_DATA = "CREATE_HRAnnouncement";
export const UPDATE_DATA = "UPDATE_HRAnnouncement";
export const DELETE_ITEM = "DELETE_SUBHRAnnouncement";

export function actionFetchHRAnnouncement(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetHRAnnouncement({
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

export function actionCreateHRAnnouncement(data) {
  const request = serviceCreateHRAnnouncement(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateHRAnnouncement(data) {
  const request = serviceUpdateHRAnnouncement(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteHRAnnouncement(id) {
  const request = serviceDeleteHRAnnouncement({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageHRAnnouncement(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterHRAnnouncement(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusHRAnnouncement(id, status) {
  //const request = serviceUpdateHRAnnouncement({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterHRAnnouncement() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageHRAnnouncement(page) {
  const stateData = store.getState().HRAnnouncement;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchHRAnnouncement(serverPage + 1, sortingData, {
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
