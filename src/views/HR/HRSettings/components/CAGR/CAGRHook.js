import React, { useState } from "react";
import { useCallback } from "react";

function useCAGRHook() {
  const initialForm = {
    company_cagr: "",
    manpower_cagr: "",
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const changeTextData = useCallback(
    (text, fieldName) => {
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
      console.log("===>",form,errorData)
    },
    [form, setForm,errorData]
  );
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    ["company_cagr", "manpower_cagr"].forEach((val) => {
      if (!form?.[val]) {
        console.log('insideloop',val)
        errors[val] = true;
      }
      else{
        delete errors[val]
      }
    });
    console.log("inside validation",{ errors, form });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    setErrorData({ ...errors });
    console.log("error", errorData);
    if (!errors) {
      // submitToServer();
    } else {
      // console.log("===errors", errors);
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
