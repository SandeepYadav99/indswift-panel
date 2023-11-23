import { useCallback, useState } from "react";

import historyUtils from "../../libs/history.utils";
import SnackbarUtils from "../../libs/SnackbarUtils";
import RouteName from "../../routes/Route.name";
import { serviceSuccessionLogin } from "../../services/Success.service";

const initialForm = {
  code: "",
  otp: "",
};

const useSuccessionApplicationFormHook = ({}) => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["code", "otp"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (form?.otp.length < 4) {
        errors.otp = "Please Enter 4 digit OTP";
      } else if (["otp"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
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
      serviceSuccessionLogin({ ...form }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          sessionStorage.setItem("CANDIDATE_ID", data?.id);
          sessionStorage.setItem("EMP_id", data?.emp_code);
          historyUtils.push(RouteName.SUCCESSION_FORM_INNER);
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
  }, [checkFormValidation, setErrorData, form, submitToServer]);

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
      if (fieldName === "otp") {
        if (text.toString()?.length <= 4) {
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

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    errorData,
    handleDelete,
  };
};

export default useSuccessionApplicationFormHook;
