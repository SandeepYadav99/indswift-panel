import React, { useState } from "react";
import { useCallback } from "react";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { serviceChangeEmployeeCAGR } from "../../../../../services/AppSettings.service";

function useCAGRHook() {
  const initialForm = {
    company_cagr: "",
    manpower_cagr: "",
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeTextData = useCallback(
    (text, fieldName) => {
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
    },
    [form, setForm,errorData]
  );
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    ["company_cagr", "manpower_cagr"].forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      }
      else{
        delete errors[val]
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
        serviceChangeEmployeeCAGR ({
            // emp_id: employeeData?.id,
            ...form
        }).then(res => {
            if (!res.error) {
                // SnackbarUtils.success('Password Changed Successfully');
            } else {
                SnackbarUtils.error(res?.message);
            }
            setIsSubmitting(false);
        })
    }
}, [form, isSubmitting, setIsSubmitting ]);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    setErrorData({ ...errors });
    if (Object.keys(errors).length === 0) {
      submitToServer();
    } else {
      console.log(form,errors,'errorFiels')
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,
  ]);
  return {
    changeTextData,
    form,
    errorData,
    changeTextData,
    handleSubmit,
  };
}

export default useCAGRHook;
