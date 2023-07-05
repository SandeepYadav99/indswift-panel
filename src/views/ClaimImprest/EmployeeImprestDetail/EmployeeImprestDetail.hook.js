import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { serviceDetailsGetInfo } from "../../../services/EmployeeImprest.service";
import { serviceGetList } from "../../../services/Common.service";
import { serviceGetImprestType } from "../../../services/ImprestApproval.service";

function useEmployeeImprestDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [createDD, setCreateDD] = useState(null);
  const [isExtendDialog, setIsExtendDialog] = useState(false);
  const [isTraineeDialog, setIsTraineeDialog] = useState(false);
  const [typeData, setTypeData] = useState({});
  const [listData, setListData] = useState({
    LOCATIONS: [],
    EMPLOYEES: [],
  });
  const { id } = useParams();
  useEffect(() => {
    let req = serviceDetailsGetInfo({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  useEffect(() => {
    serviceGetList(["LOCATIONS", "EMPLOYEES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (employeeDetail?.employee_id) {
      let req = serviceGetImprestType({
        employee_id: employeeDetail?.employee_id,
      });
      req.then((data) => {
        setTypeData(data?.data);
      });
    }
  }, [employeeDetail?.employee_id]);
  const toggleExtendDialog = useCallback(() => {
    setIsExtendDialog((e) => !e);
    setCreateDD(false);
  }, [isExtendDialog]);

  const toggleTraineeDialog = useCallback(() => {
    setIsTraineeDialog((e) => !e);
    setCreateDD(false);
  }, [isTraineeDialog]);

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
    id,
    employeeDetail,
    createDD,
    handleAddCandidate,
    handleClosedownloadCL,
    toggleExtendDialog,
    toggleTraineeDialog,
    isExtendDialog,
    isTraineeDialog,
    listData,
    typeData
  };
}

export default useEmployeeImprestDetail;
