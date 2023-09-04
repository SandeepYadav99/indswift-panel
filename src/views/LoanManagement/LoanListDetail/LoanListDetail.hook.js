import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { serviceGetLoanListDetails } from "../../../services/LoanList.service";
import { useSelector } from "react-redux";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import LogUtils from "../../../libs/LogUtils";

function useLoanListDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [form, setForm] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);
  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      let req = serviceGetLoanListDetails({ id: id });
      req.then((data) => {
        const empData = data?.data?.details?.loan;
        const { eligibility_calculations, proposal_recovery_plan } = empData;
        setForm({
          ...form,
          ...eligibility_calculations,
          ...proposal_recovery_plan,
        });
        setEmployeeDetail(data?.data?.details);
      });
    }
  }, [id]);

  const handleViewDetails2 = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.ADMIN_LOAN_PROCESS}${data?.id}`); //+data.id
  }, []);

  const handleViewRecovery = useCallback(
    (data) => {
      historyUtils.push(RouteName.ADMIN_LOAN_RECOVERY, {
        id: employeeDetail?.loan_id,
        formValues: form,
        detailId:id,
      });
    },
    [employeeDetail, form,id]
  );

  const handleViewProcessing = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.ADMIN_LOAN_PROCESS_DETAIL}${data?.loan_id}`); //+data.id
  }, []);

  return {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    role,
    handleViewDetails2,
    handleViewProcessing,
    handleViewRecovery,
    form
  };
}

export default useLoanListDetail;
