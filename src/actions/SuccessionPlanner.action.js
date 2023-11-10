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
      //   let payloadData = null;
      //   let source = null;

      //   if (data.data.year) {
      //     payloadData = data.data.year;
      //     source = "year";
      //   } else if (data.data.next_year) {
      //     payloadData = data.data.next_year;
      //     source = "next_year";
      //   } else if (data.data.next_next_year) {
      //     payloadData = data.data.next_next_year;
      //     source = "next_next_year";
      //   }
    


dispatch({ type: FETCHED, payload: { data: data.data.year, page: index , source:"year"} });
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

export function actionCreateSuccessionPlaner(data) {
  // const request = serviceCreateSuccessionPlaner(data);
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

export function actionUpdateSuccessionPlaner(data) {
  // const request = serviceUpdateSuccessionPlaner(data);
  // return (dispatch) => {
  //   request.then((data) => {
  //     if (!data.error) {
  //       dispatch({ type: UPDATE_DATA, payload: data.data });
  //     }
  //   });
  // };
}

export function actionDeleteSuccessionPlaner(id) {
  // const request = serviceDeleteSuccessionPlaner({ id: id });
  // return (dispatch) => {
  //   dispatch({ type: DELETE_ITEM, payload: id });
  // };
}

export function actionChangePageSuccessionPlaner(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterSuccessionPlaner(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      // dispatch({ type: FILTER, payload: data });
      // dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusSuccessionPlaner(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterSuccessionPlaner() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageSuccessionPlaner(page) {
  const stateData = store.getState().successionPlaner;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
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

  console.log(currentPage, totalLength);
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
