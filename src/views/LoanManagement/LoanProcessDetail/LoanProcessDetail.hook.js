import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import {
  serviceGetLoanEligiblityCalculator,
  serviceGetLoanHistory,
  serviceGetLoanListDetails,
  serviceGetLoanSchedule,
  serviceUpdateLoanFormDetails,
} from "../../../services/LoanList.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useRef } from "react";
import { useMemo } from "react";
import debounce from "lodash.debounce";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

const initialForm = {
  total_applied_loan: "",
  loan_start_date: "",
  loan_end_date: "",
  interest: "",
  employee_el: "",
  employee_el_amount: "",
  gratuity_amount: "",
  total_recoverable_amount: "",
  posible_recovery_loan: "",
  comment: "",
  previous_year_loan_comment: "",
  exceptional_approval: "",
};

function useLoanProcessDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [loanDetail, setLoanDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [experience, setExperience] = useState();
  const [employees, setEmployees] = useState([]);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [info, setInfo] = useState({});
  const travelRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (employeeDetail?.loan_id) {
      let req = serviceGetLoanEligiblityCalculator({
        id: employeeDetail?.loan_id,
      });
      req.then((data) => {
        setLoanDetail(data?.data[0]);
      });
    }
  }, [employeeDetail?.loan_id]);

  useEffect(() => {
    if (loanDetail?.applied_amount) {
      setForm({ ...form, total_applied_loan: loanDetail?.applied_amount });
    }
  }, [loanDetail?.applied_amount]);

  useEffect(() => {
    Promise.allSettled([
      serviceGetLoanListDetails({ id: id }),
      serviceGetLoanHistory({ employee_id: id }),
    ]).then((promises) => {
      const empDetail = promises[0]?.value?.data?.details;
      const loanHistory = promises[1]?.value?.data;
      setEmployeeDetail(empDetail);
      setExperience(empDetail?.loan?.employee?.experience?.current);

      const serializedData = sessionStorage.getItem("formValues");
      if (serializedData) {
        const parsedData = JSON.parse(serializedData);
        sessionStorage.removeItem('formValues');
        setForm({ ...form, ...parsedData });
      }
    });
  }, [id]);
  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);

  const checkForLoanSchedule = (data) => {
    if (data?.loan_start_date && data?.loan_end_date && data?.interest) {
      let req = serviceGetLoanSchedule({
        id: employeeDetail?.loan_id,
        total_applied_loan: data?.total_applied_loan,
        loan_start_date: data?.loan_start_date,
        loan_end_date: data?.loan_end_date,
        interest: Number(data?.interest),
      });
      req.then((res) => {
        setInfo(res.data);
      });
    } else {
      SnackbarUtils.error(
        "Please Fill the start date End date and Interest Rate"
      );
    }
  };

  const checkLoanScheduleDebounce = useMemo(() => {
    return debounce((e) => {
      checkForLoanSchedule(e);
    }, 1000);
  }, [employeeDetail?.loan_id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["loan_start_date", "loan_end_date", "interest"];

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.relocation_type?.length === 0) {
      errors["relocation_type"] = true;
      SnackbarUtils.error("Please Select the Type");
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
      serviceUpdateLoanFormDetails({
        id: id,
        ...form,
      }).then((res) => {
        if (!res.error) {
          sessionStorage.removeItem('formValues');
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsLoading(false);
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, submitToServer]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const viewRecoveryPage = useCallback(
    (data) => {
      historyUtils.push(RouteName.ADMIN_LOAN_RECOVERY, {
        id: employeeDetail?.loan_id,
        formValues: form,
      });
      const serializedData = JSON.stringify(form);
      sessionStorage.setItem("formValues", serializedData);
    },
    [employeeDetail, form]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      // LogUtils.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };
      if (
        [
          "employee_el",
          "employee_el_amount",
          "gratuity_amount",
          "total_recoverable_amount",
          "exceptional_approval",
        ].includes(fieldName)
      ) {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else if (fieldName === "interest") {
        if (text >= 0 && text <= 100) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      if (fieldName === "exceptional_approval") {
        t["total_applied_loan"] =
          Number(text) + Number(loanDetail?.applied_amount);
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      if (
        ["loan_start_date", "loan_end_date", "interest"]?.includes(fieldName)
      ) {
        checkLoanScheduleDebounce(t);
      }
    },
    [removeError, form, setForm, loanDetail, employeeDetail?.loan_id]
  );
  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );
  return {
    id,
    employeeDetail,
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    experience,
    loanDetail,
    viewRecoveryPage,
    approveDialog,
    toggleStatusDialog,
    info,
  };
}

export default useLoanProcessDetail;
