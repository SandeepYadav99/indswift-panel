import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { serviceGetLoanListDetails } from "../../../services/LoanList.service";

function useLoanListDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);

  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);
  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);

  const { id } = useParams();
  useEffect(() => {
    let req = serviceGetLoanListDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  return {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog
  };
}

export default useLoanListDetail;
