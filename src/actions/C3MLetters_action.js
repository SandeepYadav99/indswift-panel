import store from "../store";
import Constants from "../config/constants";


import { serviceC3MLetterList } from "../services/C3MLetters.service";

export const FETCH_INIT = "FETCH_INIT_C3MLetters";
export const FETCHED = "FETCHED_C3MLetters";
export const FETCHED_FAIL = "FETCHED_FAIL_C3MLetters";
export const FETCHED_FILTER = "FETCHED_FILTER_C3MLetters";
export const FETCH_NEXT = "FETCH_NEXT_C3MLetters";
export const FILTER = "FILTER_C3MLetters";
export const RESET_FILTER = "RESET_FILTER_C3MLetters";
export const SET_SORTING = "SET_SORTING_C3MLetters";
export const SET_FILTER = "SET_FILTER_C3MLetters";
export const SET_PAGE = "SET_PAGE_C3MLetters";
export const CHANGE_PAGE = "CHANGE_PAGE_C3MLetters";
export const CHANGE_STATUS = "CHANGE_STATE_C3MLetters";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_C3MLetters";
export const CREATE_DATA = "CREATE_C3MLetters";
export const UPDATE_DATA = "UPDATE_C3MLetters";
export const DELETE_ITEM = "DELETE_C3MLetters";
export const SET_OTHER_DATA = "SET_OTHER_DATA_C3MLetters";

export function actionFetchC3MLetterList(
  index = 1,
  sorting = {},
  filter = {},
  otherData = {}
) {
  const request = serviceC3MLetterList({
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
  // const request = serviceCreateNewEmployeeList(data);
  // return (dispatch) => {
  //   request.then((data) => {
  //     if (!data.error) {
  //       EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
  //         error: "Saved",
  //         type: "success",
  //       });
  //       dispatch({ type: CREATE_DATA, payload: data.data });
  //     }
  //   });
  // };
}

export function actionUpdateC3MLetterList(data) {
  // const request = serviceUpdateNewEmployeeList(data);
  // return (dispatch) => {
  //   request.then((data) => {
  //     if (!data.error) {
  //       dispatch({ type: UPDATE_DATA, payload: data.data });
  //     }
  //   });
  // };
}

export function actionChangePageC3MLetterList(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterC3MLetterList(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusC3MLetterList(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterC3MLetterList() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageC3MLetterList(page) {
  const stateData = store.getState().C3MLetter;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  const otherData = stateData.other_data;
  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchC3MLetterList(
        serverPage + 1,
        sortingData,
        { query, query_data: queryData },
        otherData
      )
    );
  }

 
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
