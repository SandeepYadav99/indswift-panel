import store from "../store";

import constants from "../config/constants";
import { serviceGetSuccessionPlanerList } from "../services/SuccessionPlanner.service";

export const FETCH_INIT = "FETCH_INIT_SUCCESSION_PLANER";
export const FETCHED = "FETCHED_SUCCESSION_PLANER";
export const FETCHED_YEAR = "FETCHED_SUCCESSION_PLANER";
export const FETCHED_NEXT_YEAR = "FETCHED_SUCCESSION_PLANER";
export const FETCHED_NEXT_NEXT_YEAR = "FETCHED_SUCCESSION_PLANER";
export const FETCHED_FAIL = "FETCHED_FAIL_SUCCESSION_PLANER";
export const FETCHED_FILTER = "FETCHED_FILTER_SUCCESSION_PLANER";

export const FETCH_NEXT = "FETCH_NEXT_SUCCESSION_PLANER";
export const FILTER = "FILTER_SUCCESSION_PLANER";
export const RESET_FILTER = "RESET_FILTER_SUCCESSION_PLANER";
export const SET_SORTING = "SET_SORTING_SUCCESSION_PLANER";
export const SET_FILTER = "SET_FILTER_SUCCESSION_PLANER";
export const SET_PAGE = "SET_PAGE_SUCCESSION_PLANER";
export const CHANGE_PAGE = "CHANGE_PAGE_SUCCESSION_PLANER";
export const CHANGE_PAGE_NEXT = "CHANGE_PAGE_SUCCESSION_PLANER_NEXT";
export const CHANGE_PAGE_NEXT_NEXT = "CHANGE_PAGE_SUCCESSION_PLANER_NEXT_NEXT";
export const CHANGE_STATUS = "CHANGE_STATE_SUCCESSION_PLANER";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_SUCCESSION_PLANER";
export const CREATE_DATA = "CREATE_SUCCESSION_PLANER";
export const UPDATE_DATA = "UPDATE_SUCCESSION_PLANER";
export const DELETE_ITEM = "DELETE_SUCCESSION_PLANER";

export function actionFetchSuccessionPlaner(
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
        // console.log("data",data)
        const year = data?.data?.year;
        const next_Year = data?.data?.next_year;
        const next_next_year = data?.data?.next_next_year;
        dispatch({
          type: FETCHED_YEAR,
          payload: {
            year: year,
            next_year: next_Year,
            next_next_year: next_next_year,
            page: index,
          },
        });

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

export function actionSetPageSuccessionPlaner(page) {
  const stateData = store.getState().successionPlaner;
  const currentPage = stateData?.currentPage;
  const totalLength = stateData?.allThisYear?.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  
  if (totalLength <= (page + 1) * constants.PAGE_VALUE) {
    store.dispatch(
      actionFetchSuccessionPlaner(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
      })
    );
  }

  console.log("current",currentPage, totalLength);
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
export function actionSetPageNextYear(page) {
  const stateData = store.getState().next_year;
  const currentPage = stateData?.currentPage;
  const totalLength = stateData?.allNextYear?.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  
  if (totalLength <= (page + 1) * constants.PAGE_VALUE) {
    store.dispatch(
      actionFetchSuccessionPlaner(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
      })
    );
  }

  console.log("next",currentPage, totalLength);
  return {
    type: CHANGE_PAGE_NEXT,
    payload: page,
  };
}
export function actionSetPageNextNextYear(page) {
  const stateData = store.getState().next_next_year;
  const currentPage = stateData?.currentPage;
  const totalLength = stateData?.allNextNextYear?.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  
  if (totalLength <= (page + 1) * constants.PAGE_VALUE) {
    store.dispatch(
      actionFetchSuccessionPlaner(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
      })
    );
  }

  console.log("next_next",currentPage, totalLength);
  return {
    type: CHANGE_PAGE_NEXT_NEXT,
    payload: page,
  };
}