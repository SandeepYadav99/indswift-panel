import {useCallback, useEffect} from "react";
import { useState } from "react";
import {serviceGetEmployeeRecord} from "../../../../../services/EmployeeRecords.services";
import {useSelector} from "react-redux";

function EmployeeRecordList({}) {
  const [isSidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);
  const { employeeData } = useSelector((state) => state.employee);
    const [data, setData] = useState([]);

    useEffect(() => {
      serviceGetEmployeeRecord({
        employee_id: employeeData.id
      }).then((res) => {
        if(!res?.error) {
          setData(res?.data);
        }
      });
    }, [employeeData]);

  const handleSideToggle = useCallback(() => {
    setSidePanel((e) => !e);
    setEditData(null);
  }, [setEditData, setSidePanel]);
  return {
    isSidePanel,
    editData,
    handleSideToggle,
    data
  };
}

export default EmployeeRecordList;
