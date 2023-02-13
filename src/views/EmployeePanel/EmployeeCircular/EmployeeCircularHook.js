import React, { useEffect, useState } from "react";
import { EmployeeCircularData } from "../../../helper/helper";
import { serviceGetEmployeeCircular } from "../../../services/EmployeeCircular.service";

function EmployeeCircularHook() {
  const [employeeCircularData, setemployeeCircularData] = useState([]);
  const StaticCircularData = EmployeeCircularData;

  useEffect(() => {
    let dataValues = serviceGetEmployeeCircular();
    dataValues
      .then((data) => {
        setemployeeCircularData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    StaticCircularData,
    employeeCircularData,
  };
}

export default EmployeeCircularHook;
