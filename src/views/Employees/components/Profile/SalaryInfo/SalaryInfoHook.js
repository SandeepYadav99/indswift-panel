import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { serviceGetEmployeeSalaryInfo } from "../../../../../services/employeeSalaryInfo.service";

function SalaryInfoHook() {
  const [EmployeeSalaryInfo, setEmployeeKnowledgeSalaryInfo] = useState([]);
  const { employeeData } = useSelector((state) => state.employee);
  useEffect(() => {
    let dataValues = serviceGetEmployeeSalaryInfo({
      emp_id: employeeData.id,
    });
    dataValues
      .then((data) => {
        setEmployeeKnowledgeSalaryInfo(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    EmployeeSalaryInfo,
  };
}

export default SalaryInfoHook;
