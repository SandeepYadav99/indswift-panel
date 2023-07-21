import {useCallback, useEffect, useMemo} from "react";
import { useState } from "react";
import { serviceGetEmployeeRecord } from "../../../../../services/EmployeeRecords.services";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router';
import Constants from "../../../../../config/constants";

function EmployeeRecordList({}) {
  const [isSidePanel, setSidePanel] = useState(false);
  const [createDD, setCreateDD] = useState(null);
  const { employeeData } = useSelector((state) => state.employee);
  const [data, setData] = useState([]);
  const [type,setType]=useState("")
  const location = useLocation();
  const {role} = useSelector(state => state.auth);

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

  const isCorporateAdminHR = useMemo(() => {
    return role === Constants.ROLES.CORPORATE_HR || role === Constants.ROLES.ADMIN;
  }, [role]);

  return {
    isSidePanel,
    handleSideToggle,
    data,
    createDD,
    handleAddCandidate,
    handleClosedownloadCL,
    type,
    location,
    isCorporateAdminHR
  };
}

export default EmployeeRecordList;
