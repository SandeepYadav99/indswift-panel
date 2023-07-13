import { useCallback, useEffect } from "react";
import { useState } from "react";
import { serviceGetEmployeeRecord } from "../../../../../services/EmployeeRecords.services";
import { useSelector } from "react-redux";

function EmployeeRecordList({}) {
  const [isSidePanel, setSidePanel] = useState(false);
  const [createDD, setCreateDD] = useState(null);
  const { employeeData } = useSelector((state) => state.employee);
  const [data, setData] = useState([]);
  const [type,setType]=useState("")

  useEffect(() => {
    serviceGetEmployeeRecord({
      employee_id: employeeData.id,
    }).then((res) => {
      if (!res?.error) {
        setData(res?.data);
      }
    });
  }, [employeeData]);

  const handleSideToggle = useCallback((type) => {
    setSidePanel((e) => !e);
    setType(type)
    setCreateDD(null);
  }, [setSidePanel, setCreateDD,setType]);

  const handleAddCandidate = useCallback(
    (event) => {
      setCreateDD(event.currentTarget);
    },
    [setCreateDD]
  );

  const handleClosedownloadCL = useCallback(() => {
    setCreateDD(null);
  }, [setCreateDD]);

  return {
    isSidePanel,
    handleSideToggle,
    data,
    createDD,
    handleAddCandidate,
    handleClosedownloadCL,
    type
  };
}

export default EmployeeRecordList;
