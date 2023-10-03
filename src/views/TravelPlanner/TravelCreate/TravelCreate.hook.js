import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import {
  serviceCheckCoPassenger,
  serviceGetEmployeeDetails,
} from "../../../services/ClaimsManagement.service";
import { useSelector } from "react-redux";
import nullImg from "../../../assets/img/null.png";
import { dataURLtoFile } from "../../../helper/helper";
import { serviceGetList } from "../../../services/Common.service";
import { serviceCreateTravelPlanner } from "../../../services/Travel.service";
import { isDate } from "../../../libs/RegexUtils";
import {
  serviceCheckAmpountImprest,
  serviceGetAmpountImprest,
} from "../../../services/Imprest.service";
import useDebounce from "../../../hooks/DebounceHook";

const initialForm = {
  start_date: "",
  end_date: "",
  tour_type: "",
  tour_nature: "",
  purpose: "",
  exception_required: false,
  exception_details: "",
  imprest_required: false,
  imprest_currency: "",
  imprest_amount: "",
  imprest_sanctionable_amount: "",
  imprest_comment:""
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
  const [amountDetail, setAmountDetail] = useState({});
  const [claimInfo, setClaimInfo] = useState({});
  const travelRef = useRef(null);
  const otherRef = useRef(null);
  const coRef = useRef(null);
  const [isChecked, setIsChecked] = React.useState(false);
  const codeDebouncer = useDebounce(form?.imprest_amount, 500);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const { id } = useParams();
  const {
    user: { emp_code, user_id },
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
    if (codeDebouncer) {
      checkImprestAmount();
    }
  }, [codeDebouncer]);

  const checkImprestAmount = useCallback(() => {
    if (form?.imprest_currency && form?.imprest_amount) {
      const errors = JSON.parse(JSON.stringify(errorData));
      serviceCheckAmpountImprest({
        currency: form?.imprest_currency,
        amount: form?.imprest_amount,
      }).then((res) => {
        if (res.error) {
          errors["imprest_amount"] = true;
          setErrorData(errors);
          SnackbarUtils.error(res.message)
        } else {
          delete errors.imprest_amount;
          setErrorData(errors);
        }
      });
    }
  }, [
    errorData,
    setErrorData,
    form?.code,
    form?.imprest_currency,
    form?.imprest_amount,
  ]);

  useEffect(() => {
    if (user_id) {
      serviceGetAmpountImprest({ employee_id: user_id }).then((res) => {
        if (!res.error) {
          setAmountDetail(res.data);
        }
      });
    }
  }, [user_id]);

  useEffect(() => {
    if (form?.imprest_amount && amountDetail && form?.imprest_currency) {
      const value =
        form?.imprest_amount -
        (amountDetail[form?.imprest_currency]?.balance
          ? amountDetail[form?.imprest_currency]?.balance
          : 0);
      setForm({ ...form, imprest_sanctionable_amount: value });
    }
  }, [form?.imprest_amount, amountDetail, form?.imprest_currency]);

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
  });

  const checkCodeValidation = () => {
    serviceCheckCoPassenger({
      start_date: form.start_date,
      end_date: form.end_date,
      employee_id: employeeDetails?.id,
    }).then((res) => {
      if (!res.error) {
        const errors = JSON.parse(JSON.stringify(errorData));
        if (res.data) {
          errors["start_date"] = true;
          SnackbarUtils.error("Claim already raised on these date");
          setErrorData(errors);
        } else {
          delete errors.start_date;
          setErrorData(errors);
        }
      }
    });
  };

  useEffect(() => {
    if (form.start_date && form.end_date && employeeDetails?.id) {
      checkCodeValidation();
    }
  }, [form.start_date, form.end_date, employeeDetails?.id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "start_date",
      "end_date",
      "tour_type",
      "purpose",
      "tour_nature",
    ];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (!form?.purpose?.trim()) {
      errors["purpose"] = true;
    }
    if (!isDate(form?.start_date)) {
      errors["start_date"] = true;
    }
    if (!isDate(form?.end_date)) {
      errors["end_date"] = true;
    }
    if (!form?.tour_nature) {
      errors["tour_nature"] = true;
      SnackbarUtils.error("Please Select the Nature of Tour");
    }
    if (!form?.tour_type) {
      errors["tour_type"] = true;
      SnackbarUtils.error("Please Select tour type");
    }
    if (form?.exception_required) {
      if (!form?.exception_details) {
        errors["exception_details"] = true;
      }
    }
    if (form?.imprest_required) {
      if (!form?.imprest_amount) {
        errors["imprest_amount"] = true;
      }
      if (!form?.imprest_currency) {
        errors["imprest_currency"] = true;
      }
    } else if (!form?.imprest_required) {
      delete errors["imprest_currency"];
      delete errors["imprest_amount"];
    }
    if (form?.start_date && form?.end_date) {
      const joinDate = new Date(form?.start_date);
      const expectedDate = new Date(form?.end_date);
      joinDate.setHours(0, 0, 0, 0);
      expectedDate.setHours(0, 0, 0, 0);
      if (joinDate.getTime() > expectedDate.getTime()) {
        SnackbarUtils.error(
          "Tour End date should not be Less than Tour Start date"
        );
        errors["end_date"] = true;
      }
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  useEffect(() => {
    if (form.tour_type) {
      setForm({ ...form, imprest_currency: "" });
    }
  }, [form.tour_type]);

  const submitToServer = useCallback(
    () => {
      if (!isSubmitting) {
        setIsLoading(true);
        setIsSubmitting(true);
        const fd = new FormData();
        Object.keys(form).forEach((key) => {
          if (key !== "imprest_amount" && key !== "imprest_currency") {
            fd.append(key, form[key]);
          }
        });
        if (form.imprest_required) {
          fd.append("imprest_currency", form.imprest_currency);
          fd.append("imprest_amount", form.imprest_amount);
        }
        fd.append("foreign_travel_bond_agreed", isBond);
        const ExpensesData = travelRef.current.getData();
        ExpensesData.forEach((val) => {
          if (val?.travel_documents) {
            fd.append("travel_documents", val?.travel_documents);
          }
        });
        if (ExpensesData[0].mode?.length > 0) {
        fd.append("travel_details", JSON.stringify(ExpensesData));
        }
        const otherExpensesData = otherRef.current.getData();
        otherExpensesData.forEach((val) => {
          if (val?.accomodation_documents) {
            fd.append("accomodation_documents", val?.accomodation_documents);
          }
        });
        if (otherExpensesData[0].type?.length > 0) {
          fd.append("accomodation_details", JSON.stringify(otherExpensesData));
        }
        if (isChecked) {
          const CoData = coRef.current.getData();
          const passanger = CoData?.map((item) => item?.co_passengers?.id);
          fd.append("co_passengers", JSON.stringify(passanger));
        }
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
    },
    [form, isSubmitting, setIsSubmitting, id, setIsChecked, isChecked],
    isBond,
    setIsBond
  );

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("---->", errors);
    const isIncludesValid = travelRef.current.isValid();
    const isOtherValid = otherRef.current.isValid();
    const isCoValid = isChecked ? coRef.current.isValid() : true;
    console.log("validation", isIncludesValid, isOtherValid, isCoValid);
    if (
      !isIncludesValid ||
      !isOtherValid ||
      !isCoValid ||
      Object.keys(errors).length > 0
    ) {
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
    setIsBond,
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
      if (fieldName === "imprest_amount") {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
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
    coRef,
    amountDetail,
  };
};

export default useTravelCreate;
