import store from "../store";
import Constants from "../config/constants";

import { serviceEmployeeRecordApprovalList } from "../services/EmpeRecordApproval.service";

export const FETCH_INIT = "FETCH_INIT_RECORD_APPROVAL";
export const FETCHED = "FETCHED_RECORD_APPROVAL";
export const FETCHED_FAIL = "FETCHED_FAIL_RECORD_APPROVAL";
export const FETCHED_FILTER = "FETCHED_FILTER_RECORD_APPROVAL";
export const FETCH_NEXT = "FETCH_NEXT_RECORD_APPROVAL";
export const FILTER = "FILTER_RECORD_APPROVAL";
export const RESET_FILTER = "RESET_FILTER_RECORD_APPROVAL";
export const SET_SORTING = "SET_SORTING_RECORD_APPROVAL";
export const SET_FILTER = "SET_FILTER_RECORD_APPROVAL";
export const SET_PAGE = "SET_PAGE_RECORD_APPROVAL";
export const CHANGE_PAGE = "CHANGE_PAGE_RECORD_APPROVAL";
export const CHANGE_STATUS = "CHANGE_STATE_RECORD_APPROVAL";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_RECORD_APPROVAL";
export const CREATE_DATA = "CREATE_RECORD_APPROVAL";
export const UPDATE_DATA = "UPDATE_RECORD_APPROVAL";
export const DELETE_ITEM = "DELETE_RECORD_APPROVAL";
export const SET_OTHER_DATA = "SET_OTHER_DATA_RECORD_APPROVAL";

export function actionFetchEmployeRecordApprovalList(
  index = 1,
  sorting = {},
  filter = {},
  otherData = {}
) {
  const request = serviceEmployeeRecordApprovalList({
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
        dispatch({ type: FETCHED, payload: { data: data?.data, page: index } });
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

export function actionCreateEmployeRecordApprovalList(data) {
 
}

export function actionUpdateEmployeRecordApprovalList(data) {

}

export function actionChangePageEmployeRecordApprovalList(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterEmployeRecordApprovalList(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusEmployeRecordApprovalList(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterEmployeRecordApprovalList() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageEmployeRecordApprovalList(page) {
  const stateData = store.getState().employeRecordApproval;
  const currentPage = stateData?.currentPage;
  const totalLength = stateData?.all?.length;
  const sortingData = stateData?.sorting_data;
 
  const query = stateData?.query;
  const queryData = stateData?.query_data;
  const serverPage = stateData?.serverPage;
  const otherData = stateData?.other_data;
  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchEmployeRecordApprovalList(
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

