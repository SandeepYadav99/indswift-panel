import { useState } from "react";
import { EmployeeEngagementData } from "../../helper/helper";
function EmployeeEngagementHook() {
  const [employeeData, setemployeeData] = useState([]);
  const StaticEngagementData = EmployeeEngagementData;

  //   useEffect(() => {
  //     let dataValues = serviceGetEmployeeInduction();
  //     dataValues
  //       .then((data) => {
  //         setemployeeData(data.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);
  return {
    StaticEngagementData,
    employeeData,
    setemployeeData
  };
}

export default EmployeeEngagementHook;
