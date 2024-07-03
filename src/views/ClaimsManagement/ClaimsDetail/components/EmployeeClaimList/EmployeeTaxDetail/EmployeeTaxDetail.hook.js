import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { serviceGetEmployeeTaxDetail } from "../../../../../../services/TaxList.service";

function useEmployeeTaxDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let req = serviceGetEmployeeTaxDetail({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);

  return {
    employeeDetail,
    id,
  };
}

export default useEmployeeTaxDetail;
