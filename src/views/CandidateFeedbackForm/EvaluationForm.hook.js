import { Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import SnackbarUtils from "../../libs/SnackbarUtils";
import { useParams } from "react-router";
import { serviceGetInterviewScheduleDetails } from "../../services/InterviewSchedule.service";
import LogUtils from "../../libs/LogUtils";

const KEYS = [
  "experience",
  "educational",
  "exposure",
  "expertise",
  "communication",
  "candidate",
  "knowledge",
  "teambuilding",
  "initiative",
];
const initialForm = {
  experience: { value: null, notes: "" },
  educational: { value: null, notes: "" },
  exposure: { value: null, notes: "" },
  expertise: { value: null, notes: "" },
  communication: { value: null, notes: "" },
  candidate: { value: null, notes: "" },
  knowledge: { value: null, notes: "" },
  teambuilding: { value: null, notes: "" },
  initiative: { value: null, notes: "" },
};

function useEvaluationFormHook({ handleNext }) {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});

  const handleRatingChange = useCallback(
    (type, text) => {
      const t = { ...form };
      t[type] = text;
      setForm(t);
      removeError(type);
    },
    [form, setForm, errorData]
  );

  const removeError = useCallback(
    (key) => {
      if (errorData?.[key]) {
        const t = { ...errorData };
        delete t[key];
        setErrorData(t);
      }
    },
    [setErrorData, errorData]
  );
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    KEYS.forEach((val) => {
      if (!form?.[val]["value"]) {
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

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length === 0) {
      handleNext(form);
    } else {
      const message = Object.keys(errors).join(", ");
      SnackbarUtils.error(`Please provide the rating for ${message} fields`);
      setErrorData(errors);
      // SnackbarUtils.error('No Data Changed');
    }
  }, [checkFormValidation, setErrorData, form, handleNext]);

  return {
    handleRatingChange,
    handleSubmit,
    errorData,
    // changeTextData,
  };
}

export default useEvaluationFormHook;
