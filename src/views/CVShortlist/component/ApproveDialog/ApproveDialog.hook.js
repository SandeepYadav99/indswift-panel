import { useCallback, useEffect, useState } from "react";
import LogUtils from "../../../../libs/LogUtils";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateCVShortlist } from "../../../../actions/CVShortlist.action";

const initialForm = {
  note: "",
};
const useApproveDialogHook = ({ isOpen, handleToggle ,dataValue}) => {
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
  const dispatch = useDispatch();
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

  function trueKeys(obj) {
    let arr = [];
  
    for (let key in obj) {
      if (obj[key] === true) {
        arr.push(key);
      }
    }
  
    return arr;
  }
  
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      handleUpdate(dataValue, "ACCEPT",form?.note)
      handleToggle();
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);
  const handleUpdate = useCallback((data, type,note) => {
    LogUtils.log("data", data, type, form);

    dispatch(actionUpdateCVShortlist(data?.id, type,note))
  }, []);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
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
    showPasswordCurrent,
    setShowPasswordCurrent,
  };
};

export default useApproveDialogHook;
