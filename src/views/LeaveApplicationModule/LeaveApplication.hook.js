import React, { useCallback,useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { serviceDetailsCLaim, serviceGetClaimsDetails } from "../../services/Claims.service";
import { useHistory } from "react-router-dom";

function useLeaveList() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);

  const [ischangeDialog, setIschangeDialog] = useState(false);
  const history = useHistory();


  const  handleLeaveApplicationForm =()=>{
    history.push("form")
  }

  const { id } = useParams();
  useEffect(() => {
    let req = serviceDetailsCLaim({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
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
