import store from "../store";
import Constants from "../config/constants";
import { serviceGetContentList } from "../services/ContentList.service";

export const FETCH_INIT = "FETCH_INIT_CONTENT_LIST";
export const FETCHED = "FETCHED_CONTENT_LIST";
export const FETCHED_FAIL = "FETCHED_FAIL_CONTENT_LIST";
export const FETCHED_FILTER = "FETCHED_FILTER_CONTENT_LIST";
export const FETCH_NEXT = "FETCH_NEXT_CONTENT_LIST";
export const FILTER = "FILTER_CONTENT_LIST";
export const RESET_FILTER = "RESET_FILTER_CONTENT_LIST";
export const SET_SORTING = "SET_SORTING_CONTENT_LIST";
export const SET_FILTER = "SET_FILTER_CONTENT_LIST";
export const SET_PAGE = "SET_PAGE_CONTENT_LIST";
export const CHANGE_PAGE = "CHANGE_PAGE_CONTENT_LIST";
export const CHANGE_STATUS = "CHANGE_STATE_CONTENT_LIST";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_CONTENT_LIST";
export const CREATE_DATA = "CREATE_CONTENT_LIST";
export const UPDATE_DATA = "UPDATE_CONTENT_LIST";
export const DELETE_ITEM = "DELETE_CONTENT_LIST";

export function actionFetchContentList(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetContentList({
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

export function actionSetPageContentList(page) {
  const stateData = store.getState().content_list;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchContentList(serverPage + 1, sortingData, {
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
