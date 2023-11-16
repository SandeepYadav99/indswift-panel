import React from "react";
import { useEffect } from "react";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { serviceGetSuccessionPlanerHistory } from "../../../../../services/SuccessionPlanner.service";
import { useState } from "react";

function useSuccessionHistory({ handleToggleSidePannel, isSidePanel, empId }) {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  useEffect(() => {
    if (empId) {
      serviceGetSuccessionPlanerHistory({ employee_id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          setEmployeeDetails(data);
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);
  return {
    employeeDetails,
  };
}

export default useSuccessionHistory;
