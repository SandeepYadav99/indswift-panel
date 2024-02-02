import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { serviceGetTaxListDetails } from "../../../services/TaxList.service";

function useTaxDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let req = serviceGetTaxListDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  return {
    employeeDetail,
  };
}

export default useTaxDetail;
