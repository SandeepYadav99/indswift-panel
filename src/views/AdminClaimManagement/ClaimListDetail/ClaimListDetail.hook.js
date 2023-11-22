import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import {
  serviceDetailsCLaim,
  serviceGetClaimsDetails,
} from "../../../services/Claims.service";
import { useState } from "react";

function useClaimListDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);

  const [ischangeDialog, setIschangeDialog] = useState(false);

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
  };
}

export default useClaimListDetail;
