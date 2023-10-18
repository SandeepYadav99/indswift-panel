import { useCallback, useEffect, useRef, useState } from "react";
import {
  serviceGetLocationDetails,
  serviceLocationClaimDepartments,
  serviceLocationClaimUpdate,
  serviceLocationDepartmentUpdate,
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
      panelist_role: "CORPORATE_ACCOUNTANT",
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

const roles=[{
  name:'SITE HR',
  id:'SITE_HR',
},
{
  name:'Recruiter',
  id:'RECRUITER',
}]
const useLocationDetail = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [data, setData] = useState(null);
  const [isHeadDialog, setIsHeadDialog] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subdepartments, setSubDepartments] = useState([]);
  const [locations,setLocations]=useState(roles)
  const [isUpdating, setIsUpdating] = useState(false);
  const includerefLoc=useRef(null)
  const includeRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    serviceGetList(["EMPLOYEES", "DEPARTMENTS","SUB_DEPARTMENTS"]).then((res) => {
      if (!res.error) {
        setEmployees(res?.data?.EMPLOYEES);
        setDepartments(res?.data?.DEPARTMENTS);
        setSubDepartments(res?.data?.SUB_DEPARTMENTS)
      }
    });
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

  const removeErrors = useCallback(
    (index, key) => {
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
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName, index) => {
      const newData = [...form.data];
      newData[index][fieldName] = text;
      setForm({ data: newData });
      const errArr = ["employee_id"];
      removeErrors(index, errArr);
    },
    [removeErrors, form, setForm]
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
        } else {
          form({ ...initialForm });
        }
      }
    });
  }, [id]);
  const handleUpdateClick = useCallback(() => {
    if (includeRef.current) {
      const isValid = includeRef.current.isValid();
      let validRole = includerefLoc.current ? includerefLoc.current.isValid() : true;
      const errors = validateData();
      if (isValid && !isUpdating && errors && validRole) {
        setIsUpdating(true);
        const data = includeRef.current.getData();
        const dataRole=includerefLoc.current.getData();
        const reqData = data?.map((val) => {
          const subDepartmentIds = val?.sub_department_ids?.map(subDepartment => subDepartment?.id);
          return {
            department_id: val?.department_id,
            employee_id: val?.employee?.id,
            sub_department_ids:subDepartmentIds
          };
        });
        const reqRoleData=dataRole?.map((val)=>{
          return {
            role:val?.department_id,
            employee_id:val?.employee?.id
          }
        })
        const masterData = form?.data?.map((val) => {
          return {
            panelist_role: val?.panelist_role,
            employee_id: val?.employee_id?.id,
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
  }, [id, isUpdating, setIsUpdating, form]);

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
  };
};

export default useLocationDetail;
