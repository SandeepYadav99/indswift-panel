import { useCallback, useEffect, useState } from "react";
import { serviceChangeEmployeeStatus} from "../../../../../services/Employee.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { useSelector } from "react-redux";
import LogUtils from "../../../../../libs/LogUtils";
import {serviceReviewOLRReject} from "../../../../../services/ReviewOLR.service";
import historyUtils from "../../../../../libs/history.utils";

const initialForm = {
  is_incorrect_info: false,
  is_joining: false,
  is_layout: false,
  is_underqualified: false,
  note: "",
};
const useRejectOLRDialogHook = ({ isOpen, handleToggle, reviewId }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
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
      if ( ['is_incorrect_info', 'is_joining', 'is_layout', 'is_underqualified'].indexOf(fieldName) >= 0) {
        removeError('is_incorrect_info');
      }
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
    if (!form?.is_incorrect_info && !form?.is_joining && !form?.is_layout && !form?.is_underqualified) {
      errors['is_incorrect_info'] = true;
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
      const reasonsArr = [];
      Object.keys(form).forEach((key) => {
        if (form?.[key]) {
          reasonsArr.push(key);
        }
      });
      serviceReviewOLRReject({
        review_id: reviewId,
        comment: form?.note ? form?.note : '',
        reason: reasonsArr.join(', '),
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Rejected Successfully");
          handleToggle();
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle, reviewId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    if (!Object.values(form).includes(true)) {
      SnackbarUtils.error("Please Select the Reason");
    }
    submitToServer();
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
  };
};

export default useRejectOLRDialogHook;
