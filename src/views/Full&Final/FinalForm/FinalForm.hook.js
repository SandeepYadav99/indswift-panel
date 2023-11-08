import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { serviceGetFinalFormDetails } from "../../../services/FinalForm.service";

function useFinalForm() {
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

export default useFinalForm;
