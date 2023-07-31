import React, { useCallback, useEffect, useState } from "react";
import {
  serviceGetLoanBudgetCheck,
  serviceGetLoanBudgetCreate,
  serviceGetLoanBudgetList,
} from "../../../../../services/LoanBudget.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const initialForm = {
  budget: "",
};

function LoanBudgetHook() {
  const [employeeCircularData, setemployeeCircularData] = useState([]);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [data, setData] = useState({});
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    let dataValues = serviceGetLoanBudgetList({
      index: 1,
      row: "createdAt",
      order: "desc",
    });
    dataValues
      .then((data) => {
        setemployeeCircularData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    serviceGetLoanBudgetCheck({
      fy_year: `${currentYear}-${currentYear + 1}`,
    }).then((res) => {
      if (!res.error) {
        const data = res?.data;
        setData(data);
      } else {
        SnackbarUtils.error(res?.message);
      }
      setIsSubmitting(false);
    });
  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["budget"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceGetLoanBudgetCreate({
        ...form,
        fy_year: `${currentYear}-${currentYear + 1}`,
      }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          window.location.reload();
          // sessionStorage.setItem("CANDIDATE_ID", data?.id);/
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

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
      let shouldRemoveError = true;
      const t = { ...form };
      if (text >= 0) {
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

  return {
    employeeCircularData,
    currentYear,
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    errorData,
    handleDelete,
    data,
  };
}

export default LoanBudgetHook;
