import {useCallback, useEffect, useState} from "react";
import LogUtils from "../../../../../libs/LogUtils";
import {useSelector} from "react-redux";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { serviceGetList} from "../../../../../services/Common.service";
import {serviceCreateVacancy} from "../../../../../services/Vacancy.service";
import Constants from "../../../../../config/constants";

const initialForm = {
  employee_id:'',
  reason:''
};

const useVacanciesDialogHook = ({ isOpen, handleSubmitProp, jobId, handleVerify }) => {
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
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });

    }
  }, [isOpen]);

  useEffect(() => {
    serviceGetList(['EMPLOYEES']).then((res) => {
        if (!res.error) {
            setEmployees(res?.data?.EMPLOYEES);
        }
    });
}, [])
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
            const req= serviceCreateVacancy({
                job_id: jobId,
                employee_id: form?.employee_id?.id,
                reason: form?.reason,
                type: Constants.VACANCY_TYPE.RAP,
            });
            req.then(res => {
                if (!res.error) {
                    handleSubmitProp();
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
            })
        }
    }, [form, isSubmitting, setIsSubmitting, handleVerify, jobId, handleSubmitProp ]);

    const handleSubmit = useCallback( () => {
        const errors = checkFormValidation();
        LogUtils.log('errors', errors);
        if (Object.keys(errors).length > 0) {
            setErrorData(errors);
            return true;
        }
        submitToServer();

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
    setShowPasswordCurrent,
    employees

  };
};

export default useVacanciesDialogHook;
