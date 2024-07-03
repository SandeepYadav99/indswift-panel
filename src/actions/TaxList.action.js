import store from "../store";
import Constants from "../config/constants";
import { serviceGetTaxList } from "../services/TaxList.service";

export const FETCH_INIT = "FETCH_INIT_TAX_LIST";
export const FETCHED = "FETCHED_TAX_LIST";
export const FETCHED_FAIL = "FETCHED_FAIL_TAX_LIST";
export const FETCHED_FILTER = "FETCHED_FILTER_TAX_LIST";
export const FETCH_NEXT = "FETCH_NEXT_TAX_LIST";
export const FILTER = "FILTER_TAX_LIST";
export const RESET_FILTER = "RESET_FILTER_TAX_LIST";
export const SET_SORTING = "SET_SORTING_TAX_LIST";
export const SET_FILTER = "SET_FILTER_TAX_LIST";
export const SET_PAGE = "SET_PAGE_TAX_LIST";
export const CHANGE_PAGE = "CHANGE_PAGE_TAX_LIST";
export const CHANGE_STATUS = "CHANGE_STATE_TAX_LIST";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_TAX_LIST";
export const CREATE_DATA = "CREATE_TAX_LIST";
export const UPDATE_DATA = "UPDATE_TAX_LIST";
export const DELETE_ITEM = "DELETE_TAX_LIST";

export function actionFetchTaxList(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetTaxList({
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


export function actionSetPageTaxList(page) {
  const stateData = store.getState().tax_list;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  
  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchTaxList(serverPage + 1, sortingData, {
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
