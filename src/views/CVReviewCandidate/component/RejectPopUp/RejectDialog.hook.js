import { useCallback, useEffect, useState } from "react";
import LogUtils from "../../../../libs/LogUtils";
import {
  serviceChangeEmployeePassword,
  serviceChangeEmployeeStatus,
} from "../../../../services/Employee.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { useSelector } from "react-redux";
import { serviceRejectInterviewClaim } from "../../../../services/InterviewClaims.service";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";

const initialForm = {
  is_less_experience: false,
  is_under_qualified: false,
  is_not_fit: false,
  is_less_behaviour: false,
  note: "",
};
const useRejectDialogHook = ({ isOpen, handleToggle, isInterview ,empId,candidateId}) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const { employeeData } = useSelector((state) => state.employee);
  const [errorData, setErrorData] = useState({});
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setResData([]);
      setIsSubmitted(false);
      setIsVerified(false);
      setErrorData({});
    }
  }, [isOpen]);

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
      setIsVerified(false);
    },
    [removeError, form, setForm, setIsVerified]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
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
      serviceChangeEmployeeStatus({
        employee_id: employeeData?.id,
        ...form,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Placed Successfully");
          handleToggle();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const submitToServerInterview = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceRejectInterviewClaim({
        review_id: candidateId,
        comment:form?.note,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Placed Successfully");
          handleToggle();
          historyUtils.push(RouteName.CLAIMS_INTERVIEW);
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    LogUtils.log("errors", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    if (!isInterview) {
      submitToServer();
    } else {
      submitToServerInterview();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer]);

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
    errorData,
    isSubmitting,
    resData,
    isSubmitted,
    isVerified,
    showPasswordCurrent,
    setShowPasswordCurrent,
  };
};

export default useRejectDialogHook;
