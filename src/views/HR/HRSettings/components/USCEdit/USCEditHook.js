import React, { useState } from "react";
import { useCallback } from "react";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import {
  serviceGetUscDetails,
  serviceGetUscUpdate,
} from "../../../../../services/AppSettings.service";
import historyUtils from "../../../../../libs/history.utils";
import { useParams } from "react-router";
import { useEffect } from "react";

function useUSCEditHook() {
  const initialForm = {
    basic_salary: "",
    annual_bonus: "",
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      serviceGetUscDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...form,
            id: data?.id,
            basic_salary: data?.basic_salary,
            annual_bonus: data?.annual_bonus,
          });
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const changeTextData = useCallback(
    (text, fieldName) => {
      const t = { ...form };
      if (text >= 0) {
        t[fieldName] = text;
      }
      setForm(t);
    },
    [form, setForm, errorData]
  );
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    ["basic_salary", "annual_bonus"].forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      } else {
        delete errors[val];
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
      serviceGetUscUpdate({
        ...form,
      }).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    setErrorData({ ...errors });
    if (Object.keys(errors).length === 0) {
      submitToServer();
    } else {
      console.log(form, errors, "errorFiels");
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

export default useUSCEditHook;
