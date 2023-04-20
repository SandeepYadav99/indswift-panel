import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import LogUtils from "../../../../libs/LogUtils";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const initialForm = {
  is_show: false,
  max_claim: null,
  max_value: null,
};

function useClaimForm({ type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const checkFormValidation = useCallback(() => {
    if (type === "CAR") {
      delete form?.max_value;
    }
    const errors = { ...errorData };
    let required = ["max_claim"];
    if (type !== "CAR") {
      required.push("max_value");
    }
    if (form?.is_show) {
      required.forEach((val) => {
        if (!form?.[val]) {
          errors[val] = true;
        }
        if (form?.[val] === 0) {
          delete errors[val];
        }
      });
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const isFormValid = useCallback(() => {
    const errors = checkFormValidation();
    LogUtils.log("isFormValid", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return false;
    }
    return true;
  }, [checkFormValidation]);

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
      if (fieldName === "max_claim") {
        if (text >= 0 && text <= 99 && !text.includes('.')) {
          t[fieldName] = text;
        }
      } else if (text >= 0) {
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
    setForm,
    errorData,
    changeTextData,
    onBlurHandler,
    handleReset,
    isFormValid,
  };
}

export default useClaimForm;
