import { useCallback, useEffect, useState } from "react";
import { serviceGetApprovalDetail } from "../../../../services/SuccessionA.service";
import { useParams } from "react-router";

const useEmpInformation = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenRejectionDialog, setIsOpenRejectionDialog] = useState(false);
  const [employeeDetail, setEmployeeDetail] = useState({});
  const { id } = useParams();
  useEffect(() => {
    let req = serviceGetApprovalDetail({ review_id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data);
    });
  }, [id]);
  console.log("employeeDetail", employeeDetail);

  const toggleIsOpenDialog = useCallback(
    (data) => {
      //   setEmpDetail(data)
      setIsOpenDialog((e) => !e);
    },
    [isOpenDialog]
  );

  const toggleIsOpenRejectionDialog = useCallback(
    (data) => {
      //   setEmpDetail(data)
      setIsOpenRejectionDialog((e) => !e);
    },
    [isOpenDialog]
  );

  return {
    toggleIsOpenDialog,
    isOpenDialog,
    toggleIsOpenRejectionDialog,
    isOpenRejectionDialog,
    id,
    employeeDetail,
  };
};

export default useEmpInformation;
