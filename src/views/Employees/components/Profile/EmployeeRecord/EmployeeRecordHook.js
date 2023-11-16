import { useCallback, useEffect } from "react";
import { useState } from "react";
import { serviceGetEmployeeRecord } from "../../../../../services/EmployeeRecords.services";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

function EmployeeRecordList({}) {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isEditPanel, setIsEditPanel] = useState(false);
  const [createDD, setCreateDD] = useState(null);
  const { employeeData } = useSelector((state) => state.employee);
  const [selectedEmp, setSelectEmp] = useState({});
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const location = useLocation();
  const {role} = useSelector(state => state.auth);
const [employId, setEmployId]=useState(null)
  useEffect(() => {
    serviceGetEmployeeRecord({
      employee_id: employeeData.id,
    }).then((res) => {
      if (!res?.error) {
        setData(res?.data);
      }
    });
  }, [employeeData]);

  const handleSideToggle = useCallback(
    (type) => {
      setSidePanel((e) => !e);
      setType(type);
      setCreateDD(null);
    },
    [setSidePanel, setCreateDD, setType]
  );

  useEffect(() => {
    if (!isEditPanel) {
      setSelectEmp({});
    }
  }, [isEditPanel]);

  const handleEditToggle = useCallback(
    (data) => {
      setSelectEmp(data);
      setIsEditPanel((e) => !e);
    },
    [setIsEditPanel, selectedEmp]
  );

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
    type,
    location,
    handleEditToggle,
    isEditPanel,
    selectedEmp,
    setSelectEmp,
    role,
    employId,
    setEmployId
  };
}

export default EmployeeRecordList;
