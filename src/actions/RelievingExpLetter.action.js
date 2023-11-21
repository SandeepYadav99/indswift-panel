import store from "../store";
import Constants from "../config/constants";


import { serviceNapsTrningList } from "../services/NAPS_Traning.service";
import { serviceRelievingExpLetterList } from "../services/Letters.service";

export const FETCH_INIT = "FETCH_INIT_RELIEVING_EXP_LETTER";
export const FETCHED = "FETCHED_RELIEVING_EXP_LETTER";
export const FETCHED_FAIL = "FETCHED_FAIL_RELIEVING_EXP_LETTER";
export const FETCHED_FILTER = "FETCHED_FILTER_RELIEVING_EXP_LETTER";
export const FETCH_NEXT = "FETCH_NEXT_RELIEVING_EXP_LETTER";
export const FILTER = "FILTER_RELIEVING_EXP_LETTER";
export const RESET_FILTER = "RESET_FILTER_RELIEVING_EXP_LETTER";
export const SET_SORTING = "SET_SORTING_RELIEVING_EXP_LETTER";
export const SET_FILTER = "SET_FILTER_RELIEVING_EXP_LETTER";
export const SET_PAGE = "SET_PAGE_RELIEVING_EXP_LETTER";
export const CHANGE_PAGE = "CHANGE_PAGE_RELIEVING_EXP_LETTER";
export const CHANGE_STATUS = "CHANGE_STATE_RELIEVING_EXP_LETTER";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_RELIEVING_EXP_LETTER";
export const CREATE_DATA = "CREATE_RELIEVING_EXP_LETTER";
export const UPDATE_DATA = "UPDATE_RELIEVING_EXP_LETTER";
export const DELETE_ITEM = "DELETE_RELIEVING_EXP_LETTER";
export const SET_OTHER_DATA = "SET_OTHER_DATA_RELIEVING_EXP_LETTER";

export function actionFetchRelievingExpLetterList(
  index = 1,
  sorting = {},
  filter = {},
  otherData = {}
) {
  const request = serviceRelievingExpLetterList({
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

export function actionUpdateRelievingExpLetterList(data) {
  // const request = serviceUpdateNewEmployeeList(data);
  // return (dispatch) => {
  //   request.then((data) => {
  //     if (!data.error) {
  //       dispatch({ type: UPDATE_DATA, payload: data.data });
  //     }
  //   });
  // };
}

export function actionChangePageRelievingExpLetterList(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterRelievingExpLetterList(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusRelievingExpLetterList(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterRelievingExpLetterList() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageRelievingExpLetterList(page) {
  const stateData = store.getState().RelievingExpLetter;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  const otherData = stateData.other_data;
  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchRelievingExpLetterList(
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
