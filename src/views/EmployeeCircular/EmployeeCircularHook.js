import React, { useEffect, useState } from "react";
import { EmployeeCircularData } from "../../helper/helper";
import { serviceGetEmployeeCircular } from "../../services/EmployeeCircular.service";

function EmployeeCircularHook() {
  const [employeeCircularData, setemployeeCircularData] = useState([]);
  const data = EmployeeCircularData;
  useEffect(() => {
    let dataValues = serviceGetEmployeeCircular();
    dataValues
      .then((data) => {
        setemployeeCircularData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    data,
    employeeCircularData,
  };
}

export default EmployeeCircularHook;
