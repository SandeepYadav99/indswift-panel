import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isDate,
  isNum,
  isSpace,
} from "../../libs/RegexUtils";
import useDebounce from "../../hooks/DebounceHook";
import LogUtils from "../../libs/LogUtils";
import {
  serviceCheckHRKnowledge,
  serviceCreateHRKnowledge,
  serviceGetHRKnowledgeDetails,
  serviceUpdateHRKnowledge,
} from "../../services/HRKnowledge.service";
import historyUtils from "../../libs/history.utils";
import EventEmitter from "../../libs/Events.utils";
import SnackbarUtils from "../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../config/constants";
import RouteName from "../../routes/Route.name";

const initialForm = {
  name: "",
  code: "",
  effective_date: "",
  revision_number: "",
  document: null,
  is_active: true,
  is_featured: true,
};

const useHRKnowledgeCreateViewDetail = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const codeDebouncer = useDebounce(form?.code, 500);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      serviceGetHRKnowledgeDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...data,
            document: null,
            is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const checkCodeValidation = useCallback(() => {
    serviceCheckHRKnowledge({ code: form?.code, id: id ? id : null }).then(
      (res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["code"] = "HRKnowledge Code Exists";
            setErrorData(errors);
          } else {
            delete errors.code;
            setErrorData(errors);
          }
        }
      }
    );
  }, [errorData, setErrorData, form?.code, id]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "code", "effective_date", "revision_number"];
    if (!id) {
      required.push("document");
    }
    console.log(form, errors);
    required.forEach(
      (val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        } else if (["code"].indexOf(val) < 0) {
          delete errors[val];
        }
      },
      [errorData, id, form]
    );

    if (form?.effective_date) {
      if (isDate(form?.effective_date)) {
        const date = new Date(form?.effective_date);
        const todayDate = new Date();
        date.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);
        if (date.getTime() < todayDate.getTime()) {
          errors["effective_date"] = true;
        }
      } else {
        errors["effective_date"] = true;
      }
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
      let req = serviceCreateHRKnowledge;
      if (id) {
        req = serviceUpdateHRKnowledge;
      }
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["is_active", "is_featured"].indexOf(key) >= 0) {
          fd.append(key, JSON.stringify(form[key]));
        } else {
          fd.append(key, form[key]);
        }
      });
      req(fd).then((res) => {
        if (!res.error) {
          historyUtils.push(RouteName.HR_KNOWLEDGE);
        } else {
          SnackbarUtils.success(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log(">===", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form]);

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
      if (fieldName === "name" || fieldName === "revision_number") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else {
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
    [changeTextData, checkCodeValidation]
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
    handleReset,
    id,
  };
};

export default useHRKnowledgeCreateViewDetail;
