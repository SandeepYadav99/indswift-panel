import { useState } from "react";
import { useEffect,useCallback } from "react";
import { useParams } from "react-router";
import { serviceGetTaxListDetails } from "../../../services/TaxList.service";

function useTaxDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const { id } = useParams();

  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);
  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);
  useEffect(() => {
    let req = serviceGetTaxListDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  return {
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    id,
  };
}

export default useTaxDetail;
