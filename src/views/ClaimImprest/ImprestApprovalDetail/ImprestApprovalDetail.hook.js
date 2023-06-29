import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import {
  serviceDetailsImprestApproval,
  serviceGetImprestType,
} from "../../../services/ImprestApproval.service";

function useImprestApprovalDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [typeData, setTypeData] = useState({});
  const [ischangeDialog, setIschangeDialog] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    let req = serviceDetailsImprestApproval({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);

  useEffect(() => {
    if (employeeDetail?.employee_id) {
      let req = serviceGetImprestType({
        employee_id: employeeDetail?.employee_id,
      });
      req.then((data) => {
        setTypeData(data?.data);
      });
    }
  }, [employeeDetail?.employee_id]);


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
    typeData,
  };
}

export default useImprestApprovalDetail;
