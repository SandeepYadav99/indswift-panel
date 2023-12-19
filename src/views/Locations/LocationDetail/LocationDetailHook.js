import { useCallback, useEffect, useRef, useState } from "react";
import {
  serviceGetLocationDetails,
  serviceGetLocationOlr,
  serviceLocationClaimDepartments,
  serviceLocationClaimUpdate,
  serviceLocationDepartmentUpdate,
  serviceLocationOlrUpdate,
  serviceLocationRoleUpdate,
} from "../../../services/Location.service";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import { serviceGetList } from "../../../services/Common.service";
import LogUtils from "../../../libs/LogUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

const initialForm = {
  data: [
    // {
    //   panelist_role: "HOD",
    //   employee_id: "",
    // },
    {
      panelist_role: "SITE_HR",
      employee_id: "",
    },
    {
      panelist_role: "SITE_HR_TAP",
      employee_id: "",
    },
    {
      panelist_role: "IMPREST_SITE_HR",
      employee_id: "",
    },
    {
      panelist_role: "CORPORATE_AUDIT_1",
      employee_id: "",
    },
    {
      panelist_role: "CORPORATE_AUDIT_2",
      employee_id: "",
    },
    {
      panelist_role: "CORPORATE_HR",
      employee_id: "",
    },
    {
      panelist_role: "TAXATION",
      employee_id: "",
    },
    {
      panelist_role: "CAO",
      employee_id: "",
    },
    {
      panelist_role: "CORPORATE_ACCOUNTANT",
      employee_id: "",
    },
    {
      panelist_role: "CEO",
      employee_id: "",
    },
    {
      panelist_role: "ACCOUNTANT",
      employee_id: "",
    },
    {
      panelist_role: "CORPORATE_FINANCE_IMP",
      employee_id: "",
    },
    {
      panelist_role: "CORPORATE_FINANCE",
      employee_id: "",
    },
    {
      panelist_role: "CASHIER",
      employee_id: "",
    },
    {
      panelist_role: "SITE_CASHIER",
      employee_id: "",
    },
    {
      panelist_role: "EXCEPTION_APPROVER",
      employee_id: "",
    },
    // {
    //   panelist_role: "TRAVEL_DESK_ONE",
    //   employee_id: "",
    // },
    {
      panelist_role: "TRAVEL_DESK_TWO",
      employee_id: "",
    },
    {
      panelist_role: "MD",
      employee_id: "",
    },
  ],
};

const roles = [
  {
    name: "SITE HR",
    id: "SITE_HR",
  },
  {
    name: "Recruiter",
    id: "RECRUITER",
  },
];

const OlrFields = {
  data: [
    {
      panelist_role: "CORPORATE_HR",
      employee_id: "",
      min_salary: 0,
      max_salary: 0,
    },
    {
      panelist_role: "EXECUTIVE",
      employee_id: "",
      min_salary: 0,
      max_salary: 0,
    },
    {
      panelist_role: "EXECUTIVE",
      employee_id: "",
      min_salary: 0,
      max_salary: 0,
    },
    {
      panelist_role: "EXECUTIVE",
      employee_id: "",
      min_salary: 0,
      max_salary: 0,
    },
  ],
};

const useLocationDetail = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [olrForm, setOlrForm] = useState({ ...OlrFields });
  const [errorData, setErrorData] = useState({});
  const [errorDataOlr, setErrorDataOlr] = useState({});
  const [data, setData] = useState(null);
  const [isHeadDialog, setIsHeadDialog] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subdepartments, setSubDepartments] = useState([]);
  const [locations, setLocations] = useState(roles);
  const [isUpdating, setIsUpdating] = useState(false);
  const includerefLoc = useRef(null);
  const includeRef = useRef(null);
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

  useEffect(() => {
    if (id) {
      serviceGetLocationOlr({ location_id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          const hrRole =
            data?.length > 0
              ? data?.filter((item) => item?.panelist_role === "CORPORATE_HR")
              : [];
          const otherRole =
            data?.length > 0
              ? data?.filter((item) => item?.panelist_role !== "CORPORATE_HR")
              : [];
          const updatedData = [...hrRole, ...otherRole];
          const value = updatedData?.map((item) => {
            return {
              panelist_role: item?.panelist_role,
              employee_id: item?.employee,
              max_salary: item?.max_salary,
              min_salary: item?.min_salary,
            };
          });
          if (value?.length > 0) {
            setOlrForm({
              data: value,
            });
          } else {
            setOlrForm({
              ...OlrFields,
            });
          }
        }
      });
    }
  }, [id]);
  const toggleHeadDialog = useCallback(
    (data) => {
      setIsHeadDialog((e) => !e);
    },
    [setIsHeadDialog]
  );

  const initData = useCallback(() => {
    if (id && !isSubmitting) {
      setIsSubmitting(true);
      const req = serviceGetLocationDetails({ id: id });
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

  const handleDepartmentUpdate = useCallback(() => {}, []);

  const validateData = (index, type) => {
    const errors = {};
    form?.data?.forEach((val, index) => {
      const err =
        index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
      const required = ["employee_id"];
      required.forEach((key) => {
        if (!val[key]) {
          err[key] = true;
        }
      });
      if (Object.keys(err).length > 0) {
        errors[index] = err;
      }
    });
    setErrorData(errors);
    return !(Object.keys(errors).length > 0);
  };
  const validateDataOlr = (index, type) => {
    const errorsOlr = {};
    olrForm?.data?.forEach((val, index) => {
      const err =
        index in errorDataOlr
          ? JSON.parse(JSON.stringify(errorDataOlr[index]))
          : {};
      const required = ["employee_id"];
      required.forEach((key) => {
        if (!val[key]) {
          err[key] = true;
        }
      });
      if (Object.keys(err).length > 0) {
        errorsOlr[index] = err;
      }
    });
    setErrorDataOlr(errorsOlr);
    return !(Object.keys(errorsOlr).length > 0);
  };

  const removeErrors = useCallback(
    (index, key, type) => {
      if (type === "olr") {
        const errors = JSON.parse(JSON.stringify(errorDataOlr));
        if (errors[index] != undefined) {
          if (Array.isArray(key)) {
            key.forEach((k) => {
              delete errors[index][k];
            });
          } else {
            delete errors[index][key];
          }
          setErrorDataOlr(errors);
        }
      } else {
        const errors = JSON.parse(JSON.stringify(errorData));
        if (errors[index] != undefined) {
          if (Array.isArray(key)) {
            key.forEach((k) => {
              delete errors[index][k];
            });
          } else {
            delete errors[index][key];
          }
          setErrorData(errors);
        }
      }
    },
    [setErrorData, errorData, errorDataOlr, setErrorDataOlr]
  );
  const changeTextData = useCallback(
    (text, fieldName, index, type) => {
      if (type === "olr") {
        const newDataOlr = [...olrForm.data];
        if (fieldName === "min_salary" || fieldName === "max_salary") {
          if (text >= 0) {
            newDataOlr[index][fieldName] = text;
          }
        } else {
          newDataOlr[index][fieldName] = text;
        }
        setOlrForm({ data: newDataOlr });
        const errArr = ["employee_id", "min_salary", "max_salary"];
        removeErrors(index, errArr, "olr");
      } else {
        const newData = [...form.data];
        newData[index][fieldName] = text;
        setForm({ data: newData });
        const errArr = ["employee_id"];
        removeErrors(index, errArr);
      }
    },
    [removeErrors, form, setForm, olrForm, setOlrForm]
  );
  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );
  useEffect(() => {
    serviceLocationClaimDepartments({ location_id: id }).then((res) => {
      if (!res.error) {
        const data = res?.data;
        const newArray = [];
        initialForm?.data.forEach((item) => {
          const foundItem = data.find(
            (element) => element?.panelist_role === item?.panelist_role
          );
          if (foundItem) {
            newArray.push({
              panelist_role: foundItem?.panelist_role,
              employee_id: foundItem?.employee,
            });
          } else {
            newArray.push(item);
          }
        });
        if (data?.length) {
          setForm({
            data: newArray,
          });
        }
      }
    });
  }, [id]);
  const handleUpdateClick = useCallback(() => {
    if (includeRef.current) {
      const isValid = includeRef.current.isValid();
      let validRole = includerefLoc.current
        ? includerefLoc.current.isValid()
        : true;
      const errors = validateData();
      const errorsOlr = validateDataOlr();
      if (isValid && !isUpdating && errors && validRole && errorsOlr) {
        setIsUpdating(true);
        const data = includeRef.current.getData();
        const dataRole = includerefLoc.current.getData();
        const reqData = data?.map((val) => {
          const subDepartmentIds = val?.sub_department_ids?.map(
            (subDepartment) => subDepartment?.id
          );
          return {
            department_id: val?.department_id,
            employee_id: val?.employee?.id,
            sub_department_ids: subDepartmentIds,
          };
        });
        const reqRoleData = dataRole?.map((val) => {
          return {
            role: val?.department_id,
            employee_id: val?.employee?.id,
          };
        });
        const masterData = form?.data?.map((val) => {
          return {
            panelist_role: val?.panelist_role,
            employee_id: val?.employee_id?.id,
          };
        });
        const OlrData = olrForm?.data?.map((val) => {
          return {
            panelist_role: val?.panelist_role,
            employee_id: val?.employee_id?.id,
            min_salary: val?.min_salary,
            max_salary: val?.max_salary,
          };
        });
        Promise.allSettled([
          serviceLocationDepartmentUpdate({
            location_id: id,
            data: reqData,
          }),
          serviceLocationClaimUpdate({
            location_id: id,
            data: masterData,
          }),
          serviceLocationRoleUpdate({
            location_id: id,
            data: reqRoleData,
          }),
          serviceLocationOlrUpdate({
            location_id: id,
            data: OlrData,
          }),
          //
        ]).then((promises) => {
          const department = promises[0]?.value;
          const claim = promises[1]?.value;
          if (!department?.error && !claim?.error) {
            SnackbarUtils.success("Details updated successfully");
            historyUtils.push(RouteName.LOCATIONS);
          } else {
            SnackbarUtils.error(
              department?.message ? department?.message : claim?.message
            );
          }
        });
        setIsUpdating(false);
      }
    }
  }, [id, isUpdating, setIsUpdating, , olrForm, form]);

  const handleEditBtn = useCallback(() => {
    historyUtils.push(RouteName.LOCATIONS_UPDATE + id);
  }, [id]);

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
    includeRef,
    includerefLoc,
    locations,
    handleDepartmentUpdate,
    handleUpdateClick,
    handleEditBtn,
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    olrForm,
    errorDataOlr,
  };
};

export default useLocationDetail;
