import { useCallback, useState } from "react";

import historyUtils from "../../libs/history.utils";
import SnackbarUtils from "../../libs/SnackbarUtils";
import RouteName from "../../routes/Route.name";
import { serviceExitInterviewLogin } from "../../services/ExitInterview.service";

const initialForm = {
  emp_code: "",
  code: "",
};

const useSuccessionApplicationFormHook = ({}) => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["emp_code", "code"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (form?.code.length < 4) {
        errors.code = "Please Enter 4 digit OTP";
      } else if (["code"].indexOf(val) < 0) {
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
      serviceExitInterviewLogin({ ...form }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          sessionStorage.setItem("CANDIDATE_ID", data?.id);
          historyUtils.push(RouteName.EXIT_INTERVIEW_FORM);
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
      if (fieldName === "code") {
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
