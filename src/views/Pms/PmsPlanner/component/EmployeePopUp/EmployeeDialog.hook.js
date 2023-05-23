import { useCallback, useEffect, useState } from "react";
import { serviceGetCandidatePRCS } from "../../../../services/Candidate.service";
import { serviceGetList } from "../../../../services/Common.service";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";

const initialForm={
  emp_id:'',
};
const useEmployeeDialogHook = ({ isOpen, handleToggle, candidateId ,listData }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData};
    let required = ['emp_id'];
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
     
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle, candidateId]);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    // historyUtils.push(RouteName.EMPLOYEE_CONVERSION + form?.emp_id?.id);
    historyUtils.push(
      `${RouteName.EMPLOYEE_CREATE}`,
      {
        isOnboard: true,
        empId: form?.emp_id?.id,
      }
    );
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
  };
};

export default useEmployeeDialogHook;
