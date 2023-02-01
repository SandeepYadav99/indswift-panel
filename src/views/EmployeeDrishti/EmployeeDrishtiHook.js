import React, { useEffect } from "react";
import { useState } from "react";
import { EmployeeDrishtiData } from "../../helper/helper";

function EmployeeDrishtiHook() {
  const [employeeData, setemployeeData] = useState([]);
  const staticEmployeeDrishtiData = EmployeeDrishtiData;

  // useEffect(() => {
  //   let dataValues = serviceGetEmployeeInduction();
  //   dataValues
  //     .then((data) => {
  //       setemployeeData(data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return {
    staticEmployeeDrishtiData,
    employeeData,
  };
}

export default EmployeeDrishtiHook;
