import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { serviceGetFinalFormApprovalDetails } from "../../../services/FinalFormApproval.service";

function useFullDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let req = serviceGetFinalFormApprovalDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  return {
    employeeDetail,
  };
}

export default useFullDetail;
