import React, { useEffect } from "react";
import { useState } from "react";
import { EmployeeIkigaiData } from "../../../helper/helper";

function EmployeeIkigaiHook() {
  const [employeeData, setemployeeData] = useState([]);
  const staticEmployeeIkigaiData = EmployeeIkigaiData;

  // useEffect(() => {
  //   let dataValues = serviceGetEmployeeInduction();
  //   dataValues
  //     .then((data) => {
  //       setemployeeData(data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return {
    staticEmployeeIkigaiData,
    employeeData,
  };
}

export default EmployeeIkigaiHook;
