import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { EmployeeDeepakData } from "../../../helper/helper";
import historyUtils from "../../../libs/history.utils";
import { serviceGetUtsavDetails } from "../../../services/EmployeeUtsav.service";

function EmployeeUtsavHook() {
  const [employeeUtsavData, setemployeeUtsavData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const staticEmployeeDeepakData = EmployeeDeepakData;

  const handleItemClick = (index) => {
    setSelectedItemIndex(index === selectedItemIndex ? null : index);
  };

  useEffect(() => {
    let dataValues = serviceGetUtsavDetails({});
    dataValues
      .then((data) => {
        data.data.sort((a, b) => (a.priority > b.priority ? -1 : 1));
        setemployeeUtsavData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleViewDetails = useCallback((data) => {
    historyUtils.push(`/employee/utsav/${data}`);
  }, []);
  return {
    staticEmployeeDeepakData,
    employeeUtsavData,
    handleViewDetails,
    handleItemClick,
    selectedItemIndex
  };
}

export default EmployeeUtsavHook;
