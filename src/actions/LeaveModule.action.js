import {serviceLeaveList} from "../services/Leave.service";

export const LIST_LEAVE = "LIST_LEAVE";

export function actionLeaveList(data){
   const request = serviceLeaveList(data);
   return (dispatch) => {
      request.then((data) => {
              dispatch({type: LIST_LEAVE, payload: data})  
      })
  }
}