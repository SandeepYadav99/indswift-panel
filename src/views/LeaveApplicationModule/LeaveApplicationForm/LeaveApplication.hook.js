import { useState, useRef, useCallback, useEffect } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import { isAlphaNumChars, isSpace } from "../../../libs/RegexUtils";
import { useParams } from "react-router-dom";
import { serviceLeaveCreate } from "../../../services/Leave.service";

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
const OccasionKey = [
  "duration",
  "duration_days",
  "type",
  "comment",
  "document",
];

const Bereavement = [
  "deceased_relationship",
  "start_date",
  "end_date",
  "comment",
];

const Facilitation = ["reason", "start_date", "end_date", "comment"];

const Paternity = ["event_type", "child", "start_date", "end_date", "comment"];

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
      let required = ["event_type", "child", "start_date", "end_date", "comment"];
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

  useEffect(() => {
    if (form?.type) {
      const type = form?.type;
      setErrorData({});
      setForm({ ...initialForm, type: type });
    }
  }, [form?.type]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      let req = serviceLeaveCreate;
      const fd = new FormData();
      let reqParam =
        form?.type === "OCCASION_LEAVE"
          ? OccasionKey
          : form?.type === "BEREAVEMENT_LEAVE"
          ? Bereavement
          : form?.type === "FACILITATION_LEAVE"
          ? Facilitation
          : Paternity;
      reqParam?.forEach((key) => {
        fd.append(key, form[key]);
      });
      req(fd).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Submitted SuccessFully");
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
      if (fieldName === "duration") {
        if (text === "HALF_DAY") {
          t["duration_days"] = 0.5;
        } else {
          t["duration_days"] = 1;
        }
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  console.log("form", form, errorData);
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
