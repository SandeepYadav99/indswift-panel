import { useCallback, useEffect, useState } from "react";
import { serviceChangeEmployeeStatus} from "../../../../../services/Employee.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { useSelector } from "react-redux";
import LogUtils from "../../../../../libs/LogUtils";

const initialForm={
  is_incorrect_info:false,
  is_joining:false,
  is_layout:false,
  is_underqualified:false,
  note:""
}
const useRejectOLRDialogHook = ({ isOpen, handleToggle }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const { employeeData } = useSelector((state) => state.employee);
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
      // setIsSubmitting(true);
      // serviceChangeEmployeeStatus({
      //   employee_id: employeeData?.id,
      //   ...form,
      // }).then((res) => {
      //   if (!res.error) {
      //     SnackbarUtils.success("Request Placed Successfully");
      //     handleToggle();
      //   } else {
      //     SnackbarUtils.error(res?.message);
      //   }
      //   setIsSubmitting(false);
      // });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?",form,errors)
    LogUtils.log("errors", errors);
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
  };
};

export default useRejectOLRDialogHook;
