import React, { useEffect } from "react";
import { useState } from "react";
// import { EmployeePerformanceData } from "../../helper/helper";

function EmployeePerformanceHook() {
  const [employeeData, setemployeeData] = useState([]);
  // const staticEmployeePerformanceData = EmployeePerformanceData;

  return {
    // staticEmployeePerformanceData,
    // employeeData,
  };
}

export default EmployeePerformanceHook;
