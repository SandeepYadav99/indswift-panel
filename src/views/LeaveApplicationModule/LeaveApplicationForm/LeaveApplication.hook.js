import { useState, useRef, useCallback, useEffect } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import { isAlphaNumChars, isSpace } from "../../../libs/RegexUtils";
import { useParams } from "react-router-dom";

const initialForm = {
  type: "",
  duration: "",
  duration_days: "",
  event_type: "",
  start_date: "",
  end_date: "",
  purpose: "",
  event: "",
  child: "",
  choose_leave: "",
  select_event: "",
  comment: "",
  deceased_relationship: "",
  reason: "",
  document: null,
};

const useLeaveApplication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leaveType, setLeaveType] = useState();
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const { id } = useParams();

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "code"];
    if (form?.type === "OCCASION_LEAVE") {
      let required = ["duration", "event_type", "comment"];
      required.forEach((val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        }
      });
    }
    if (form?.type === "BEREAVEMENT_LEAVE") {
      let required = [
        "deceased_relationship",
        "start_date",
        "end_date",
        "comment",
      ];
      required.forEach((val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        }
      });
    }
    if (form?.type === "FACILITATION_LEAVE") {
      let required = ["reason", "start_date", "end_date", "comment"];
      required.forEach((val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        }
      });
    }
    if (form?.type === "PATERNITY_LEAVE") {
      let required = [
        "duration",
        "child",
        "start_date",
        "end_date",
        "comment",
      ];
      required.forEach((val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
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

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
    }
    alert("API is being Called");
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, includeRef.current]);

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
      t[fieldName] = text;
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
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    id,
    leaveType,
    setLeaveType,
  };
};

export default useLeaveApplication;
