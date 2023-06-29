import { useCallback, useEffect, useRef, useState } from "react";
import { serviceGetLocationDetails } from "../../../services/Location.service";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import { serviceGetList } from "../../../services/Common.service";
import LogUtils from "../../../libs/LogUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import { serviceGetDepartmentDetails } from "../../../services/Department.service";

const useDepartmentDetail = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [data, setData] = useState(null);
  const [isHeadDialog, setIsHeadDialog] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subdepartments, setSubDepartments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    serviceGetList(["EMPLOYEES", "DEPARTMENTS", "SUB_DEPARTMENTS"]).then(
      (res) => {
        if (!res.error) {
          setEmployees(res?.data?.EMPLOYEES);
          setDepartments(res?.data?.DEPARTMENTS);
          setSubDepartments(res?.data?.SUB_DEPARTMENTS);
        }
      }
    );
  }, []);

  const toggleHeadDialog = useCallback(
    (data) => {
      setIsHeadDialog((e) => !e);
    },
    [setIsHeadDialog]
  );

  const initData = useCallback(() => {
    if (id && !isSubmitting) {
      setIsSubmitting(true);
      const req = serviceGetDepartmentDetails({ id: id });
      req.then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setData(data);
          setIsActive(data?.status === Constants.GENERAL_STATUS.ACTIVE);
        }
        setIsSubmitting(false);
      });
    }
  }, [id, isSubmitting, setIsSubmitting, setIsActive]);

  useEffect(() => {
    initData();
  }, [id]);

  const handleSwitchChange = useCallback(() => {
    setIsActive((e) => !e);
  }, [setIsActive]);

  const handleHeadUpdate = useCallback(
    (data) => {
      toggleHeadDialog();
      setData(data);
    },
    [toggleHeadDialog, setData]
  );

  const handleEditBtn = useCallback(() => {
    historyUtils.push(RouteName.DEPARTMENT_UPDATE + id);
  }, [id]);
  const handleUpdateClick = useCallback(() => {
    historyUtils.push(RouteName.DEPARTMENTS);
  }, []);
  return {
    isSubmitting,
    data,
    toggleHeadDialog,
    isHeadDialog,
    isDetails,
    setIsDetails,
    isActive,
    handleSwitchChange,
    employees,
    id,
    handleHeadUpdate,
    departments,
    subdepartments,
    handleEditBtn,
    handleUpdateClick,
  };
};

export default useDepartmentDetail;
