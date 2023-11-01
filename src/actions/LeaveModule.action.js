import {
  serviceLeaveList,
  serviceLeaveCount,
  serviceLeaveDataList,
} from "../services/Leave.service";

export const LIST_LEAVE = "LIST_LEAVE";
export const COUNT_LEAVE = "COUNT_LEAVE";
export const LEAVES_DATA = "LEAVES_DATA";

export function actionLeaveList(data) {
  const request = serviceLeaveList(data);
  return (dispatch) => {
    request.then((data) => {
      dispatch({ type: LIST_LEAVE, payload: data });
    });
  };
}

export function actionLeaveCount(data) {
  const request = serviceLeaveCount(data);
  return (dispatch) => {
    request.then((data) => {
      dispatch({ type: COUNT_LEAVE, payload: data });
    });
  };
}

export function actionLeavesListData(data) {
  const request = serviceLeaveDataList(data);
  return (dispatch) => {
    request.then((data) => {
      dispatch({ type: LEAVES_DATA, payload: data });
    });
  };
}
