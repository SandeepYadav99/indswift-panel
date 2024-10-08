import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { serviceDetailsTravel } from "../../../services/Travel.service";

function useTravelDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [closureDialog,setClosureDialog]=useState(false)
  const [ischangeDialog, setIschangeDialog] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    let req = serviceDetailsTravel({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);

  const toggleClosureDialog = useCallback(() => {
    setClosureDialog((e) => !e);
  }, [closureDialog]);

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
    toggleClosureDialog,
    closureDialog
  };
}

export default useTravelDetail;
