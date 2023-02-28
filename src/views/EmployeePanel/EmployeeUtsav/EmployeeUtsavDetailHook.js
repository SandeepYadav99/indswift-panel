import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { serviceGetUtsavDetailsInfo } from "../../../services/EmployeeUtsav.service";

function EmployeeUtsavDetailHook() {
  const [employeeUtsavDetailData, setemployeeUtsavDetailData] = useState({});
  const id = useParams();
  useEffect(() => {
    let dataValues = serviceGetUtsavDetailsInfo(id);
    dataValues
      .then((data) => {
        setemployeeUtsavDetailData(data?.data?.details);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    employeeUtsavDetailData,
  };
}

export default EmployeeUtsavDetailHook;
