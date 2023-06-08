import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import { serviceGetEmployeeDetails } from "../../../services/ClaimsManagement.service";
import { useSelector } from "react-redux";
import nullImg from "../../../assets/img/null.png";
import { dataURLtoFile } from "../../../helper/helper";
import { serviceGetList } from "../../../services/Common.service";
import { serviceCreateTravelPlanner } from "../../../services/Travel.service";

const initialForm = {
  start_date: "",
  end_date: "",
  tour_type: "",
  tour_nature: "",
  purpose: "",
  exception_required: false,
  exception_details: "",
};

const useTravelCreate = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBond, setIsBond] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [editData, setEditData] = useState(null);
  const [declaration, setDeclaration] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [claimInfo, setClaimInfo] = useState({});
  const travelRef = useRef(null);
  const otherRef = useRef(null);
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const { id } = useParams();
  const {
    user: { emp_code },
  } = useSelector((state) => state.auth);
  useEffect(() => {
    Promise.allSettled([
      serviceGetEmployeeDetails({ code: emp_code }),
      serviceGetList(["EMPLOYEES"]),
    ]).then((promises) => {
      const empDetail = promises[0]?.value?.data;
      const listData = promises[1]?.value?.data;
      setEmployeeDetails(empDetail);
      setEmployees(listData?.EMPLOYEES);
    });
  }, []);
  useEffect(() => {
    if (form?.tour_type === "FOREIGN") {
      if (
        employeeDetails?.experience?.current < 2 ||
        employeeDetails?.experience?.total < 5
      ) {
        setIsBond(true);
      }
    } else {
      setIsBond(false);
    }
  }, [form?.tour_type, employeeDetails]);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["start_date", "end_date", "tour_type", "purpose"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (!form?.tour_type) {
      errors["tour_type"] = true;
      SnackbarUtils.error("Please Select tour type");
    }
    if (form?.exception_required) {
      if (!form?.exception_details) {
        errors["exception_details"] = true;
      }
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsLoading(true);
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        fd.append(key, form[key]);
      });
      fd.append('foreign_travel_bond_agreed',isBond)
      const ExpensesData = travelRef.current.getData();
      ExpensesData.forEach((val) => {
        if (val?.travel_documents) {
          fd.append("travel_documents", val?.travel_documents);
        }
      });
      fd.append("travel_details", JSON.stringify(ExpensesData));
      const otherExpensesData = otherRef.current.getData();
      otherExpensesData.forEach((val) => {
        if (val?.accomodation_documents) {
          fd.append("accomodation_documents", val?.accomodation_documents);
        } else {
          const file = dataURLtoFile(nullImg, "null.png");
          fd.append("accomodation_documents", file);
        }
      });
      fd.append("accomodation_details", JSON.stringify(otherExpensesData));
      let req = serviceCreateTravelPlanner;
      req(fd).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsLoading(false);
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, setIsChecked, isChecked],isBond,setIsBond);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("---->", errors);
    const isIncludesValid = travelRef.current.isValid();
    const isOtherValid = otherRef.current.isValid();
    if (!isIncludesValid || !isOtherValid || Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    submitToServer,
    setIsChecked,
    isChecked,
    isBond,
    setIsBond
  ]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      // LogUtils.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    handleDelete,
    handleReset,
    editData,
    declaration,
    setDeclaration,
    employeeDetails,
    claimInfo,
    travelRef,
    otherRef,
    isChecked,
    handleCheckboxChange,
    employees,
    isBond,
  };
};

export default useTravelCreate;
