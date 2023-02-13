import React, { useEffect, useState } from "react";
import { EmployeeknowledgeData } from "../../../helper/helper";
import { serviceGetEmployeeKnowledge } from "../../../services/EmployeeKnowledge";

function EmployeeKnowledgeHook() {
  const [EmployeeKnowledgeData, setEmployeeKnowledgeData] = useState([]);
  const StaticKnowledgeData = EmployeeknowledgeData;

  useEffect(() => {
    let dataValues = serviceGetEmployeeKnowledge();
    dataValues
      .then((data) => {
        setEmployeeKnowledgeData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    StaticKnowledgeData,
    EmployeeKnowledgeData,
  };
}

export default EmployeeKnowledgeHook;
