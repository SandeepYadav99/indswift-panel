import React from "react";
import { serviceGetNewEmployeeDetails } from "../../../services/NewEmployeeList.service";
import historyUtils from "../../../libs/history.utils";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";

function useNewEmployeeDetails() {
  const [employeeData, setEmployeeData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let dataValues = serviceGetNewEmployeeDetails({ emp_id: id });
    dataValues.then((data) => {
      if (!data?.error) {
        setEmployeeData(data.data);
      } else {
        SnackbarUtils.error(data?.message);
        historyUtils.goBack();
      }
    });
  }, [id]);
  return {
    employeeData,
  };
}

export default useNewEmployeeDetails;
