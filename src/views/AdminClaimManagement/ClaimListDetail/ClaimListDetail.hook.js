import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { serviceGetClaimsDetails } from "../../../services/Claims.service";
import { useState } from "react";

function useClaimListDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [ischangeDialog, setIschangeDialog] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    let req = serviceGetClaimsDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);
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
  };
}

export default useClaimListDetail;
