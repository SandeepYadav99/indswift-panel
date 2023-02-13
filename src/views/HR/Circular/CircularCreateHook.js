import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlphaNumChars, isDate,
} from "../../../libs/RegexUtils";
import LogUtils from "../../../libs/LogUtils";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import {serviceCreateCircular, serviceGetCircularDetails, serviceUpdateCircular} from "../../../services/Circular.service";

const initialForm = {
  name: "",
  effective_date: "",
  document: null,
  is_active: true,
  is_featured: true,
};

const useCircularDetail = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      serviceGetCircularDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;

          setForm({
            ...data,
            document: null,
            is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
            effective_date: new Date(data?.effective_date),
          });
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "effective_date"];
    if (!id) {
      required.push("document");
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    if (form?.effective_date) {
    if (isDate(form?.effective_date)) {
      // const date = new Date(form?.effective_date);
      // const todayDate = new Date();
      // date.setHours(0, 0, 0, 0);
      // todayDate.setHours(0, 0, 0, 0);
      // if (date.getTime() < todayDate.getTime()) {
      //   errors['effective_date'] = true;
      // }
    } else {
      errors['effective_date'] = true;
    }
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  }, [form, errorData, id]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      let req = serviceCreateCircular;
      if (id) {
        req = serviceUpdateCircular;
      }
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (['is_active', 'is_featured'].indexOf(key) >= 0) {
          fd.append(key, JSON.stringify(form[key]));
        } else {
          fd.append(key, form[key]);
        }
      })
      req(fd).then((res) => {
        LogUtils.log("response", res);
        if (!res.error) {
          historyUtils.push(RouteName.HR_CIRCULARS);
        } else {
          SnackbarUtils.success(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
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
        if (!text || (isAlphaNumChars(text))) { // && text.toString().length <= 30
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
  };
};

export default useCircularDetail;
