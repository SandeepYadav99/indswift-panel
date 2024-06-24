import React from "react";
import { serviceGetNewEmployeeApprove, serviceGetNewEmployeeDetails } from "../../../services/NewEmployeeList.service";
import historyUtils from "../../../libs/history.utils";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useCallback } from "react";
import RouteName from "../../../routes/Route.name";

function useNewEmployeeDetails() {
  const [employeeData, setEmployeeData] = useState({});
  const [rejectDialog, setRejectDialog] = useState(false);
  const [approveDialog, setApproveDialog] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    let dataValues = serviceGetNewEmployeeDetails({ emp_id: id });
    dataValues.then((data) => {
      if (!data?.error) {
        setEmployeeData(data.data);
      } else {
        SnackbarUtils.error(data?.message);
        historyUtils.goBack();
      }
    });
  }, [id]);

  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);

  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);

  const handleDialogConfirm = useCallback((item) => {
    let req = serviceGetNewEmployeeApprove;
    req({ emp_id: id ,pass_current_authorities:item === "YES"}).then((res) => {
      if (!res.error) {
        historyUtils.push(RouteName.NEW_EMPLOYEES);
      } else {
        SnackbarUtils.error(res?.message);
      }
    });
  }, [id]);

  return {
    employeeData,
    rejectDialog,
    toggleRejectDialog,
    approveDialog,
    toggleStatusDialog,
    handleDialogConfirm,
    id,
  };
}

export default useNewEmployeeDetails;
