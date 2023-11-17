import store from "../store";
import Constants from "../config/constants";
import {
  serviceGetSuccessionA,
} from "../services/SuccessionA.service";

export const FETCH_INIT = "FETCH_INIT_SUCCESSION_A";
export const FETCHED = "FETCHED_SUCCESSION_A";
export const FETCHED_FAIL = "FETCHED_FAIL_SUCCESSION_A";
export const FETCHED_FILTER = "FETCHED_FILTER_SUCCESSION_A";
export const FETCH_NEXT = "FETCH_NEXT_SUCCESSION_A";
export const FILTER = "FILTER_SUCCESSION_A";
export const RESET_FILTER = "RESET_FILTER_SUCCESSION_A";
export const SET_SORTING = "SET_SORTING_SUCCESSION_A";
export const SET_FILTER = "SET_FILTER_SUCCESSION_A";
export const SET_PAGE = "SET_PAGE_SUCCESSION_A";
export const CHANGE_PAGE = "CHANGE_PAGE_SUCCESSION_A";
export const CHANGE_STATUS = "CHANGE_STATE_SUCCESSION_A";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_SUCCESSION_A";
export const CREATE_DATA = "CREATE_SUCCESSION_A";
export const UPDATE_DATA = "UPDATE_SUCCESSION_A";
export const DELETE_ITEM = "DELETE_SUCCESSION_A";

export function actionFetchSuccessionA(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetSuccessionA({
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


export function actionSetPageSuccessionA(page) {
  const stateData = store.getState().final_form;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  
  if (totalLength <= (page + 1) * Constants.PAGE_VALUE) {
    store.dispatch(
      actionFetchSuccessionA(serverPage + 1, sortingData, {
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
