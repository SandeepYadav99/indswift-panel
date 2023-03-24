import { useCallback } from "react";
import { useState } from "react";

function EmployeeRecordList() {
  const [isSidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);

  //   const [EmployeeSalaryInfo, setEmployeeKnowledgeSalaryInfo] = useState([]);
  //   const { employeeData } = useSelector((state) => state.employee);
  //   useEffect(() => {
  //     let dataValues = serviceGetEmployeeSalaryInfo({
  //       emp_id: employeeData.id,
  //     });
  //     dataValues
  //       .then((data) => {
  //         setEmployeeKnowledgeSalaryInfo(data.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  const handleSideToggle = useCallback(() => {
    setSidePanel((e) => !e);
    setEditData(null);
  }, [setEditData, setSidePanel]);
  return {
    isSidePanel,
    editData,
    handleSideToggle,
  };
}

export default EmployeeRecordList;
