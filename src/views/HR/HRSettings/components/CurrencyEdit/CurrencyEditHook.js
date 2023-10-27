import React, { useState } from "react";
import { useCallback } from "react";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import {
  serviceGetCurrencyDetails,
  serviceGetCurrencyUpdate,
} from "../../../../../services/AppSettings.service";
import historyUtils from "../../../../../libs/history.utils";
import { useParams } from "react-router";
import { useEffect } from "react";

function useCurrencyEditHook() {
  const initialForm = {
    conversion_rate: "",
  };
  const [form, setForm] = useState({ ...initialForm });
  const [detail,setDetail]=useState({})
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      serviceGetCurrencyDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...form,
            id: data?.id,
            conversion_rate: data?.conversion_rate,
          });
          setDetail(data)
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
    ["conversion_rate"].forEach((val) => {
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
      serviceGetCurrencyUpdate({
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
    detail
  };
}

export default useCurrencyEditHook;
