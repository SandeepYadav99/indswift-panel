import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { serviceEmployeeClaimDetails } from "../../../../../../services/Claims.service";
import { useState } from "react";

function useEmpClaimDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});

  const { id } = useParams();
  useEffect(() => {
    let req = serviceEmployeeClaimDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);

  return {
    id,
    employeeDetail,
  };
}

export default useEmpClaimDetail;
