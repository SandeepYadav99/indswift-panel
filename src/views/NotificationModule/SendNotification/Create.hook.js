import { useState, useRef, useCallback, useEffect } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router-dom";
import {
  serviceLeaveCount,
  serviceLeaveCreate,
} from "../../../services/Leave.service";
import { useDispatch, useSelector } from "react-redux";
import historyUtils from "../../../libs/history.utils";
import { useMemo } from "react";
import { serviceGetEmployeeDetails } from "../../../services/ClaimsManagement.service";
import { serviceCreateNotificationModule } from "../../../services/NotificationModule.service";
import { serviceGetList } from "../../../services/Common.service";

const initialForm = {
  title: "",
  message: "",
  send_to: "",
  send_priority: "",
  location_id: "",
  garde_id: "",
  designation_id: "",
  department_id: "",
  send_timestamp: "",
};

const useCreate = () => {
  const [form, setForm] = useState({ ...initialForm })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [listData, setListData] = useState({});

  useEffect(() => {
    serviceGetList(["DEPARTMENTS", "DESIGNATIONS", "LOCATIONS","GRADES"]).then((res) => {
      if (!res.error) {
        setListData(res?.data);
      }
    });
  }, []);


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

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["title", "message", "send_to", "send_priority"];

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });

  }, [changeTextData])

  const submitToServer = useCallback(() => {
     console.log(form,"form is here whre are you ??")
  }, [
    form,
    isSubmitting,
    setIsSubmitting,
  ]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    form,
  ]);

  return {
    handleSubmit,
    form,
    onBlurHandler,
    changeTextData,
    listData,
  };
};

export default useCreate;
