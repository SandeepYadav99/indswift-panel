import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { EmployeeHRData } from "../../../helper/helper";
import { serviceGetEmployeeHRPolicy } from "../../../services/EmployeeHRPolicy.service";

function EmployeeHRPolicyHook() {
  const [employeeHRData, setemployeeHRData] = useState([]);
  const [allData, setAllData] = useState([]);
  const StaticPolicyData = EmployeeHRData;
  useEffect(() => {
    let dataValues = serviceGetEmployeeHRPolicy();
    dataValues
      .then((data) => {
        setemployeeHRData(data?.data);
        setAllData(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilterDataChange = useCallback(
    (value) => {
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );
  const queryFilter = useCallback((key, value) => {
  }, []);
  const handleSearchValueChange = useCallback(
    (value) => {
      if (value) {
        const tempData = allData?.filter((val) => {
          if (val?.name?.match(new RegExp(value, "ig"))) {
            return val;
          }
        });
        setemployeeHRData(tempData);
      } else {
        setemployeeHRData(allData);
      }
    },
    [
      employeeHRData,
      allData,
      setAllData,
      setemployeeHRData,
      handleFilterDataChange,
      queryFilter,
    ]
  );

  return {
    StaticPolicyData,
    employeeHRData,
    // handleFilterDataChange,
    handleSearchValueChange,
  };
}

export default EmployeeHRPolicyHook;
