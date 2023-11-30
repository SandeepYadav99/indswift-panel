import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { serviceGetFinalFormApprovalDetails } from "../../../services/FinalFormApproval.service";
import { useCallback } from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

function useFullDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const { id } = useParams();

  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);
  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);

  useEffect(() => {
    let req = serviceGetFinalFormApprovalDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);

  const EditForm = useCallback(() => {
    historyUtils.push(
      RouteName.FULL_FINAL_FORM + employeeDetail?.full_and_final_id,
      { isEdit: true }
    ); //+data.id
  }, [employeeDetail]);

  return {
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    id,
    EditForm,
  };
}

export default useFullDetail;
