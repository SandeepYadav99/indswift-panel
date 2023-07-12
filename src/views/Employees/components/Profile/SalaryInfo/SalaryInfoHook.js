import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { serviceGetEmployeeSalaryInfo } from "../../../../../services/employeeSalaryInfo.service";

function SalaryInfoHook() {
  const [EmployeeSalaryInfo, setEmployeeKnowledgeSalaryInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { employeeData } = useSelector((state) => state.employee);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    if (employeeData.id) {
      let dataValues = serviceGetEmployeeSalaryInfo({
        employee_id: employeeData.id,
        index: currentPage,
      });
      dataValues
        .then((data) => {
          setEmployeeKnowledgeSalaryInfo(data.data);
          setTotalPages(data?.data?.totalCount);
        })
        .catch((err) => console.log(err));
    }
  }, [employeeData.id, currentPage]);

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
