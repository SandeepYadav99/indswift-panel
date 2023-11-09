import store from "../store";
import Constants from "../config/constants";
import {
  serviceGetCVShortlistCandidates, serviceUpdateCVShortlistRequest,
} from "../services/CVShortlist.service";

export const FETCH_INIT = "FETCH_INIT_CV_SHORTLISTS";
export const FETCHED = "FETCHED_CV_SHORTLISTS";
export const FETCHED_FAIL = "FETCHED_FAIL_CV_SHORTLISTS";
export const FETCHED_FILTER = "FETCHED_FILTER_CV_SHORTLISTS";
export const FETCH_NEXT = "FETCH_NEXT_CV_SHORTLISTS";
export const FILTER = "FILTER_CV_SHORTLISTS";
export const RESET_FILTER = "RESET_FILTER_CV_SHORTLISTS";
export const SET_SORTING = "SET_SORTING_CV_SHORTLISTS";
export const SET_FILTER = "SET_FILTER_CV_SHORTLISTS";
export const SET_PAGE = "SET_PAGE_CV_SHORTLISTS";
export const CHANGE_PAGE = "CHANGE_PAGE_CV_SHORTLISTS";
export const CHANGE_STATUS = "CHANGE_STATE_CV_SHORTLISTS";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_CV_SHORTLISTS";
export const CREATE_DATA = "CREATE_CV_SHORTLISTS";
export const UPDATE_DATA = "UPDATE_CV_SHORTLISTS";
export const DELETE_ITEM = "DELETE_CV_SHORTLISTS";

export function actionFetchCVShortlist(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetCVShortlistCandidates({index, row: sorting.row, order: sorting.order, ...filter}); // GetCVShortlist
  return (dispatch) => {
    if (shouldReset) {
      dispatch({
        type: CHANGE_PAGE,
        payload: 1,
      });
    }
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


export function actionUpdateCVShortlist(reviewId, type,reason,note) {
  const request = serviceUpdateCVShortlistRequest({ review_id: reviewId, type: type ,reason:reason,note:note});
  return (dispatch) => {
    dispatch({ type: UPDATE_DATA, payload: { id: reviewId, type } });
    // request.then((data) => {
    //   if (!data.error) {
    //     dispatch({ type: UPDATE_DATA, payload: reviewId });
    //   }
    // });
  };
}

export function actionFilterCVShortlist(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusCVShortlist(id, status) {
  //const request = serviceUpdateCVShortlist({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterCVShortlist() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageCVShortlist(page) {
  const stateData = store.getState().cvShortlist;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchCVShortlist(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
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
