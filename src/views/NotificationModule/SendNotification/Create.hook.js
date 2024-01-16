import { useState, useRef, useCallback, useEffect } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router-dom";
import historyUtils from "../../../libs/history.utils";
import {
  serviceCreateNotificationModule,
  serviceDetailNotificationModule,
} from "../../../services/NotificationModule.service";
import { serviceGetList } from "../../../services/Common.service";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";

const initialForm = {
  title: "",
  message: "",
  send_to: "",
  send_priority: "",
  location_id: "",
  grade_id: "",
  designation_id: "",
  department_id: "",
  send_timestamp: "",
};

const useCreate = () => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [listData, setListData] = useState({});

  const params = useParams();

  useEffect(() => {
    serviceGetList(["DEPARTMENTS", "DESIGNATIONS", "LOCATIONS", "GRADES"]).then(
      (res) => {
        if (!res.error) {
          setListData(res?.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    serviceDetailNotificationModule({ id: params?.id }).then((res) => {
      if (!res.error) {
        const data = res?.data;
        const fd = {};
        Object.keys({ ...initialForm }).forEach((val) => {
          fd[val] = data[val];
        });
        setForm({
          ...form,
          title: data?.title,
          message: data?.message,
          send_to: data?.send_to,
          send_priority: data?.send_priority,
          department_id: data?.department?.id,
          location_id: data?.location?.id,
          grade_id: data?.grade?.id,
          designation_id: data?.designation?.id,
          send_timestamp: data?.send_timestamp,
          id: data?.id,
        });
      }
      else{
        setForm({})
      }
    });
  }, [params?.id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "title",
      "message",
      "send_to",
      "send_priority",
      form?.send_priority === "LATTER" ? "send_timestamp" : "",
      form?.send_to === "LOCATION"
        ? "location_id"
        : form?.send_to === "DEPARTMENT"
        ? "department_id"
        : form?.send_to === "DESIGNATION"
        ? "designation_id"
        : form?.send_to === "GRDAE"
        ? "grade_id"
        : form?.send_to === "ALL" && "",
    ];
    required.forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      }
    });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, isSubmitting]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceCreateNotificationModule({
        ...form,
      })?.then((res) => {
        LogUtils.log("response", res);
        if (!res.error) {
          historyUtils.push(RouteName.APP_NOTIFICATION);
        } else {
          SnackbarUtils.error(res?.error);
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
  }, [checkFormValidation, setErrorData, form]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData, form]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (!text) {
        t[fieldName] = text;
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

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    errorData,
    listData,
  };
};

export default useCreate;
