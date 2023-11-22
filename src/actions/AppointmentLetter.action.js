import store from "../store";
import Constants from "../config/constants";
import { serviceAppointmentLetterList } from "../services/Letters.service";

export const FETCH_INIT = "FETCH_INIT_APPOINTMENT_LETTERS";
export const FETCHED = "FETCHED_APPOINTMENT_LETTERS";
export const FETCHED_FAIL = "FETCHED_FAIL_APPOINTMENT_LETTERS";
export const FETCHED_FILTER = "FETCHED_FILTER_APPOINTMENT_LETTERS";
export const FETCH_NEXT = "FETCH_NEXT_APPOINTMENT_LETTERS";
export const FILTER = "FILTER_APPOINTMENT_LETTERS";
export const RESET_FILTER = "RESET_FILTER_APPOINTMENT_LETTERS";
export const SET_SORTING = "SET_SORTING_APPOINTMENT_LETTERS";
export const SET_FILTER = "SET_FILTER_APPOINTMENT_LETTERS";
export const SET_PAGE = "SET_PAGE_APPOINTMENT_LETTERS";
export const CHANGE_PAGE = "CHANGE_PAGE_APPOINTMENT_LETTERS";
export const CHANGE_STATUS = "CHANGE_STATE_APPOINTMENT_LETTERS";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_APPOINTMENT_LETTERS";
export const CREATE_DATA = "CREATE_APPOINTMENT_LETTERS";
export const UPDATE_DATA = "UPDATE_APPOINTMENT_LETTERS";
export const DELETE_ITEM = "DELETE_APPOINTMENT_LETTERS";
export const SET_OTHER_DATA = "SET_OTHER_DATA_APPOINTMENT_LETTERS";

export function actionFetchAppointmentLetterList(
  index = 1,
  sorting = {},
  filter = {},
  otherData = {}
) {
  const request = serviceAppointmentLetterList({
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

export function actionCreateAppointmentLetterList(data) {
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

export function actionUpdateAppointmentLetterList(data) {
  // const request = serviceUpdateNewEmployeeList(data);
  // return (dispatch) => {
  //   request.then((data) => {
  //     if (!data.error) {
  //       dispatch({ type: UPDATE_DATA, payload: data.data });
  //     }
  //   });
  // };
}

export function actionChangePageAppointmentLetterList(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterAppointmentLetterList(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusAppointmentLetterList(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterAppointmentLetterList() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageAppointmentLetterList(page) {
  const stateData = store.getState().AppointmentLetter;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData?.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;
  const otherData = stateData.other_data;
  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchAppointmentLetterList(
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
