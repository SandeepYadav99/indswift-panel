import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serviceGetEmployeeDetails } from "../../services/ClaimsManagement.service";

function useSuccessionDetail() {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      Promise.allSettled([serviceGetEmployeeDetails({ code: id })]).then(
        (promises) => {
          const empDetail = promises[0]?.value?.data;
          setEmployeeDetails(empDetail);
        }
      );
    }
  }, [id]);
  return {
    employeeDetails,
  };
}

export default useSuccessionDetail;
