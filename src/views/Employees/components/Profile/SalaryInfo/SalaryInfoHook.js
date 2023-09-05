import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  serviceGetEmployeeSalaryInfo,
  serviceGetPendingEmployeeSalaryInfo
} from "../../../../../services/employeeSalaryInfo.service";

function SalaryInfoHook({ Empid, isPending}) {
  const [EmployeeSalaryInfo, setEmployeeKnowledgeSalaryInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { employeeData } = useSelector((state) => state.employee);
  const [totalPages, setTotalPages] = useState(10);

  const Id = Empid ? Empid : employeeData?.id;

  useEffect(() => {
    if (Id) {
      let req = serviceGetEmployeeSalaryInfo;
      if (isPending) {
        req = serviceGetPendingEmployeeSalaryInfo;
      }
      let dataValues = req({
        employee_id: Id,
        emp_id: Id,
        index: currentPage,
      });

      dataValues
        .then((data) => {
          setEmployeeKnowledgeSalaryInfo(data.data);
          setTotalPages(data?.data?.totalCount);
        })
        .catch((err) => console.log(err));
    }
  }, [Id, currentPage, isPending]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return {
    EmployeeSalaryInfo,
    currentPage,
    handlePageChange,
    totalPages,
  };
}

export default SalaryInfoHook;
