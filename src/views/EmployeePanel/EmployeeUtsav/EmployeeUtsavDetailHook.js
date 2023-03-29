import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { serviceGetUtsavDetailsInfo } from "../../../services/EmployeeUtsav.service";

function EmployeeUtsavDetailHook() {
  const [employeeUtsavDetailData, setemployeeUtsavDetailData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const toggleDialog = useCallback(
    (e) => {
      setCurrentIndex(e.currentTarget.id);
      setIsOpen((s) => !s);
    },
    [isOpen, currentIndex]
  );
  const id = useParams();
  useEffect(() => {
    let dataValues = serviceGetUtsavDetailsInfo(id);
    dataValues
      .then((data) => {
        setemployeeUtsavDetailData(data?.data?.details);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    employeeUtsavDetailData,
    toggleDialog,
    isOpen,
    currentIndex,
  };
}

export default EmployeeUtsavDetailHook;
