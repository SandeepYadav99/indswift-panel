import React, { useEffect } from "react";
import { useState } from "react";
import { InductionData } from "../../../helper/helper";
import { serviceGetEmployeeInduction } from "../../../services/EmployeeInduction.service";

function EmployeeInducationHook() {
  const [employeeData, setemployeeData] = useState([]);
  const data = InductionData;

  useEffect(() => {
    let dataValues = serviceGetEmployeeInduction();
    dataValues
      .then((data) => {
        setemployeeData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    data,
    employeeData,
  };
}

export default EmployeeInducationHook;
