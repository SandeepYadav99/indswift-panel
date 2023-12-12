import store from "../store";

import constants from "../config/constants";
import { serviceGetSuccessionPlanerList } from "../services/SuccessionPlanner.service";

export const FETCH_INIT = "FETCH_INIT_AFTER_SUCCESSION_PLANER";
export const FETCHED = "FETCHED_AFTER_SUCCESSION_PLANER";
export const FETCHED_FAIL = "FETCHED_FAIL_AFTER_SUCCESSION_PLANER";
export const FETCHED_FILTER = "FETCHED_FILTER_AFTER_SUCCESSION_PLANER";
export const FETCH_NEXT = "FETCH_NEXT_AFTER_SUCCESSION_PLANER";
export const FILTER = "FILTER_AFTER_SUCCESSION_PLANER";
export const RESET_FILTER = "RESET_FILTER_AFTER_SUCCESSION_PLANER";
export const SET_SORTING = "SET_SORTING_AFTER_SUCCESSION_PLANER";
export const SET_FILTER = "SET_FILTER_AFTER_SUCCESSION_PLANER";
export const SET_PAGE = "SET_PAGE_AFTER_SUCCESSION_PLANER";
export const CHANGE_PAGE = "CHANGE_PAGE_AFTER_SUCCESSION_PLANER";
export const CHANGE_STATUS = "CHANGE_STATE_AFTER_SUCCESSION_PLANER";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_AFTER_SUCCESSION_PLANER";
export const CREATE_DATA = "CREATE_AFTER_SUCCESSION_PLANER";
export const UPDATE_DATA = "UPDATE_AFTER_SUCCESSION_PLANER";
export const DELETE_ITEM = "DELETE_AFTER_SUCCESSION_PLANER";

export function actionFetchAfterSuccessionPlaner(
  index = 1,
  sorting = {},
  filter = {}
) {
  const request = serviceGetSuccessionPlanerList({
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

export function actionSetPageAfterSuccessionPlaner(page,year) {
  const stateData = store.getState().next_next_year;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  
  if (totalLength <= (page + 1) * constants.PAGE_VALUE) {
    store.dispatch(
      actionFetchAfterSuccessionPlaner(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
        year:year
      })
    );
  }

  console.log(currentPage, totalLength);
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
