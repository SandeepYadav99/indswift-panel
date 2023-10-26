import {serviceLeaveList,serviceLeaveCount} from "../services/Leave.service";

export const LIST_LEAVE = "LIST_LEAVE";
export const COUNT_LEAVE= "COUNT_LEAVE";

export function actionLeaveList(data){
   const request = serviceLeaveList(data);
   return (dispatch) => {
      request.then((data) => {
              dispatch({type: LIST_LEAVE, payload: data})  
      })
  }
}

export function actionLeaveCount(data){
        const request = serviceLeaveCount(data);
        return (dispatch) => {
           request.then((data) => {
                   dispatch({type: COUNT_LEAVE, payload: data})  
           })
       }
 }