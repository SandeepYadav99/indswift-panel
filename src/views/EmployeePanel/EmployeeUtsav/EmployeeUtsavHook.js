import React, { useEffect } from "react";
import { useState } from "react";
import { EmployeeDeepakData } from "../../../helper/helper";

function EmployeeUtsavHook() {
  const [employeeData, setemployeeData] = useState([]);
  const staticEmployeeDeepakData = EmployeeDeepakData;

  // useEffect(() => {
  //   let dataValues = serviceGetEmployeeInduction();
  //   dataValues
  //     .then((data) => {
  //       setemployeeData(data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return {
    staticEmployeeDeepakData,
    employeeData,
  };
}

export default EmployeeUtsavHook;
