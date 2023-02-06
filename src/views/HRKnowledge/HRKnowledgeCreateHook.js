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
import { serviceGetList } from "../../services/Common.service";
const initialForm = {
  name: "",
  location_id: "",
  department_id: "",
  submitted_by: [],
  document: null,
  is_active: true,
};

const useHRKnowledgeCreateViewDetail = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const [listData, setListData] = useState({
    LOCATIONS: [],
    DEPARTMENTS: [],
    EMPLOYEES: [],
  });
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
  useEffect(() => {
    serviceGetList(["LOCATIONS", "DEPARTMENTS", "EMPLOYEES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "location_id", "department_id", "submitted_by"];
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
        }
      },
      [errorData, id, form]
    );

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
        if (["is_active", "submitted_by"].indexOf(key) >= 0) {
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
      if (fieldName === "name") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
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
    handleReset,
    id,
    listData,
  };
};

export default useHRKnowledgeCreateViewDetail;
