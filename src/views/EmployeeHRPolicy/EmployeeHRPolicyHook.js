import React, { useState } from "react";
import { useEffect } from "react";
import { EmployeeHRData } from "../../helper/helper";
import { serviceGetEmployeeHRPolicy } from "../../services/EmployeeHRPolicy.service";

function EmployeeHRPolicyHook() {
  const [employeeHRData, setemployeeHRData] = useState([]);
  const data = EmployeeHRData;
  useEffect(() => {
    let dataValues = serviceGetEmployeeHRPolicy();
    dataValues
      .then((data) => {
        setemployeeHRData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("====>", employeeHRData);

  return {
    data,
    employeeHRData,
  };
}

export default EmployeeHRPolicyHook;
