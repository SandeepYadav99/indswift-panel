import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateEmployeeReport,
  serviceGetEmployeeReport,
  serviceUpdateEmployeeReport,
  serviceDeleteEmployeeReport,
} from "../services/EmployeeReport.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_EMPLOYEE_REPORT";
export const FETCHED = "FETCHED_EMPLOYEE_REPORT";
export const FETCHED_FAIL = "FETCHED_FAIL_EMPLOYEE_REPORT";
export const FETCHED_FILTER = "FETCHED_FILTER_EMPLOYEE_REPORT";
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = "FETCH_NEXT_EMPLOYEE_REPORT";
export const FILTER = "FILTER_EMPLOYEE_REPORT";
export const RESET_FILTER = "RESET_FILTER_EMPLOYEE_REPORT";
export const SET_SORTING = "SET_SORTING_EMPLOYEE_REPORT";
export const SET_FILTER = "SET_FILTER_EMPLOYEE_REPORT";
export const SET_PAGE = "SET_PAGE_EMPLOYEE_REPORT";
export const CHANGE_PAGE = "CHANGE_PAGE_EMPLOYEE_REPORT";
export const CHANGE_STATUS = "CHANGE_STATE_EMPLOYEE_REPORT";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_EMPLOYEE_REPORT";
export const CREATE_DATA = "CREATE_EMPLOYEE_REPORT";
export const UPDATE_DATA = "UPDATE_EMPLOYEE_REPORT";
export const DELETE_ITEM = "DELETE_EMPLOYEE_REPORT";

export function actionFetchEmployeeReport(
  index = 1,
  sorting = {},
  filter = {}
) {
  const request = serviceGetEmployeeReport({
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
        dispatch({ type: FETCHED, payload: { data: data.data.data,total: data?.data?.total, page: index } });
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

export function actionCreateEmployeeReport(data) {
  const request = serviceCreateEmployeeReport(data);
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

export function actionUpdateEmployeeReport(data) {
  const request = serviceUpdateEmployeeReport(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteEmployeeReport(id) {
  const request = serviceDeleteEmployeeReport({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageEmployeeReportRequests(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

// export function nextPRequestsClick() {
//     return {
//         type: NEXT_PREQUESTS,
//         payload: null,
//     };
// }
//
// export function prevPRequestsClick() {
//     return {
//         type: PREV_PREQUESTS,
//         payload: null,
//     };
// }

export function actionFilterEmployeeReportRequests(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusEmployeeReportRequests(id, status) {
  // const request = serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
    // request.then((data) => {
    //     dispatch({type: FILTER_PREQUESTS, payload: data});
    //     dispatch({type: FETCHED_PREQUESTS, payload: null});
    // });
  };
}

export function actionResetFilterEmployeeReportRequests() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageEmployeeReportRequests(page,other) {
  const stateData = store.getState().employeeReport;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  console.log("ohter",other)
  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchEmployeeReport(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
        ...other
      })
    );
    // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
  }

  console.log(currentPage, totalLength);
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
