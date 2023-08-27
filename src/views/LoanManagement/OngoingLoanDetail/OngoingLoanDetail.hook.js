import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import LogUtils from "../../../libs/LogUtils";
import { serviceGetEmployeeLoanDetails } from "../../../services/EmployeeLoanList.service";

function useOngoingLoanDetail() {
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
    let req = serviceGetEmployeeLoanDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);

  const handleViewDetails2 = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.ADMIN_LOAN_PROCESS}${data?.id}`); //+data.id
  }, []);

  return {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    handleViewDetails2,
  };
}

export default useOngoingLoanDetail;
