import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { EmployeeDeepakData } from "../../../helper/helper";
import historyUtils from "../../../libs/history.utils";
import { serviceGetUtsavDetails } from "../../../services/EmployeeUtsav.service";

function EmployeeUtsavHook() {
  const [employeeUtsavData, setemployeeUtsavData] = useState([]);
  const staticEmployeeDeepakData = EmployeeDeepakData;

  useEffect(() => {
    let dataValues = serviceGetUtsavDetails({});
    dataValues
      .then((data) => {
        setemployeeUtsavData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleViewDetails = useCallback((data) => {
    console.log("=====>", data);
    historyUtils.push(`/employee/utsav/${data}`);  
  }, []);
  console.log("employeeData", employeeUtsavData);
  return {
    staticEmployeeDeepakData,
    employeeUtsavData,
    handleViewDetails,
  };
}

export default EmployeeUtsavHook;
