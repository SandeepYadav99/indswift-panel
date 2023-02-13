import React, { useState } from "react";
import { useEffect } from "react";
import { EmployeeHRData } from "../../../helper/helper";
import { serviceGetEmployeeHRPolicy } from "../../../services/EmployeeHRPolicy.service";

function EmployeeHRPolicyHook() {
  const [employeeHRData, setemployeeHRData] = useState([]);
  const StaticPolicyData = EmployeeHRData;
  useEffect(() => {
    let dataValues = serviceGetEmployeeHRPolicy();
    dataValues
      .then((data) => {
        setemployeeHRData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    StaticPolicyData,
    employeeHRData,
  };
}

export default EmployeeHRPolicyHook;
