import {serviceLeaveCreate} from "../services/Leave.service";


export const CREATE_LEAVE = "CREATE_LEAVE";


export function actionCreateLeave(data) {
  const req = serviceLeaveCreate(data);
  return (dispatch) => {
    dispatch({ type: CREATE_LEAVE, payload: data });
  };
}
