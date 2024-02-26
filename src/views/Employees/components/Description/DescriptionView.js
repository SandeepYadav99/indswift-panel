import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { serviceGetDescriptionRecord } from "../../../../services/EmployeeRecords.services";

function DescriptionView({}) {
  const { employeeData } = useSelector((state) => state.employee);
  const [decDialog, setDecDialog] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchData()
  }, [employeeData]);

  const fetchData = useCallback(() => {
    async function fetchDataAsync() {
      try {
        const res = await serviceGetDescriptionRecord({
          employee_id: employeeData?.id,
          index: 1,
        });
        if (!res?.error) {
          setData(res?.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchDataAsync();
  }, [employeeData?.id]);

  const toggleDecDialog = useCallback(
    (data) => {
      setDecDialog((e) => !e);
    },
    [decDialog]
  );

  return {
    data,
    location,
    decDialog,
    toggleDecDialog,
    fetchData
  };
}

export default DescriptionView;
