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
  const [requiredField, setRequiredField] = useState([
    "title",
    "message",
    "send_to",
    "send_priority",
  ]);
  const params = useParams();

  useEffect(() => {
    const dynamicFields =[];
    setErrorData({})
    if (form?.send_to === "DEPARTMENT") {
      dynamicFields.push("department_id");
    } else if (form?.send_to === "DESIGNATION") {
      dynamicFields.push("designation_id");
    } else if (form?.send_to === "GRADE") {
      dynamicFields.push("grade_id");
    } else if (form?.send_to === "LOCATION") {
      dynamicFields.push("location_id");
    }
    if(form?.send_priority === "LATER"){
      dynamicFields.push("send_timestamp")
    }
    else if(form?.send_priority === "NOW"){
      const index = dynamicFields.indexOf("send_timestamp");
      if(index !== -1){
        dynamicFields.splice(index,1)
      }
    }
    setRequiredField([
      "title",
      "message",
      "send_to",
      "send_priority",
      ...dynamicFields,
    ]);

  }, [params?.id, handleSubmit, checkFormValidation,form?.send_to,form?.send_priority]);

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
      } else {
        setForm({
          send_priority: "NOW",
          send_to: "ALL",
        });
      }
    });
  }, [params?.id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    requiredField.forEach((val) => {
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
  }, [form, errorData, isSubmitting,form?.send_to,requiredField,form?.send_priority]);

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
  }, [form, isSubmitting, setIsSubmitting,errorData]);

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
