import React from "react";
import { useState } from "react";
import { serviceGetFinalFormDetails } from "../../../services/FinalForm.service";
import { useEffect } from "react";
import { useParams } from "react-router";

function useFinalDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let req = serviceGetFinalFormDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  return {
    employeeDetail,
  };
}

export default useFinalDetail;
