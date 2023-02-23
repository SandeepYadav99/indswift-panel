import { Snackbar } from "@material-ui/core";
import React, { useState } from "react";
import { useCallback } from "react";
import SnackbarUtils from "../../libs/SnackbarUtils";
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
function UseEvaluationFormHook() {
  const initialForm = {
    experience: {
      value: null,
      notes: "",
    },
    educational: {
      value: null,
      notes: "",
    },
    exposure: {
      value: null,
      notes: "",
    },
    expertise: {
      value: null,
      notes: "",
    },
    communication: {
      value: null,
      notes: "",
    },
    candidate: {
      value: null,
      notes: "",
    },
    knowledge: {
      value: null,
      notes: "",
    },
    teambuilding: {
      value: null,
      notes: "",
    },
    initiative: {
      value: null,
      notes: "",
    },
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [open, setOpen] = useState(true);

  const handleRatingChange = useCallback(
    (type, text) => {
      const t = { ...form };
      t[type] = text;
      setForm(t);
    },
    [form, setForm]
  );
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    KEYS.forEach((val) => {
      if (!form?.[val]["value"]) {
        errors[val] = true;
      }
    });
    console.log({ errors, form });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (!errors) {
      // submitToServer();
    } else {
      const message = Object.keys(errors).join(", ");
      // <Snackbar message="hello" autoHideDuration={3000} />;
      // SnackbarUtils.error(`Please provide the rating for ${message} fields`);
      console.log("===errors", message, errors);
      // SnackbarUtils.error('No Data Changed');
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,
  ]);
  return {
    handleRatingChange,
    handleSubmit,
    // changeTextData,
  };
}

export default UseEvaluationFormHook;
