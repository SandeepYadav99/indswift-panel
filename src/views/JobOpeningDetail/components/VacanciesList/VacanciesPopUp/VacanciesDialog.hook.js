import {useCallback, useEffect, useState} from "react";
import LogUtils from "../../../../../libs/LogUtils";
import {useSelector} from "react-redux";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const initialForm = {
  employee_id:'',
  reason:''
};

const useVacanciesDialogHook = ({ isOpen, handleToggle, handleVerify }) => {
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
        const errors = {...errorData};
        let required = ['reason','employee_id'];
        required.forEach(val => {
            if (!form?.[val] || (Array.isArray(form?.[val]) && form?.[val].length === 0)) {
                errors[val] = true;
            } else if ([].indexOf(val) < 0) {
                delete errors[val]
            }
        });
        Object.keys(errors).forEach(key => {
            if (!errors[key]) {
                delete errors[key];
            }
        })
        return errors;
    }, [form, errorData]);

    const submitToServer = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            const req= 'API CALL'
            req.then(res => {
                if (!res.error) {
                    if (res.data) {
                        handleVerify();
                    } else {
                        SnackbarUtils.error('Password does not match');
                    }
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
            })
        }
    }, [form, isSubmitting, setIsSubmitting, employeeData, handleVerify ]);

    const handleSubmit = useCallback(async () => {
        const errors = checkFormValidation();
        LogUtils.log('errors', errors);
        if (Object.keys(errors).length > 0) {
            setErrorData(errors);
            return true;
        }
        // submitToServer();

    }, [
        checkFormValidation,
        setErrorData,
        form,
        submitToServer
    ]);

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
    setShowPasswordCurrent


  };
};

export default useVacanciesDialogHook;
