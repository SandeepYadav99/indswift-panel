import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { serviceDetailsTravel } from "../../../services/Travel.service";
import { serviceGetEmployeeLoanDetails } from "../../../services/EmployeeLoanList.service";
function useEmployeeLoanDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});

  const { id } = useParams();

  useEffect(() => {
    let req = serviceGetEmployeeLoanDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);

  return {
    id,
    employeeDetail,
  };
}

export default useEmployeeLoanDetail;
