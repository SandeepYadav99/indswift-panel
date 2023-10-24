import React, { useCallback,useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { actionLeaveList } from "../../actions/LeaveModule.action";
import { useDispatch } from "react-redux";


function useLeaveList() {
  const dispatch = useDispatch()
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);

  const [ischangeDialog, setIschangeDialog] = useState(false);
  const history = useHistory();

  let params = {
    index: 1,
    row: "createdAt",
    order: "desc",
    query: "",
    query_data: null,
  };

  useEffect(()=>[
     dispatch(actionLeaveList(params))
  ],[])




  const  handleLeaveApplicationForm =()=>{
    history.push("form")
  }

  const { id } = useParams();
 
  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);
  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);
  const toggleChangeDialog = useCallback(() => {
    setIschangeDialog((e) => !e);
  }, [ischangeDialog]);
  
  return {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleChangeDialog,
    ischangeDialog,
    toggleRejectDialog,
    rejectDialog,
    handleLeaveApplicationForm
  };
}

export default useLeaveList;
