import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { serviceChangeEmployeeStatus } from "../../../../../services/Employee.service";
import {serviceGetCandidatePRCS} from "../../../../../services/Candidate.service";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";

const initialForm={
  job_id:"",
}
const useExtendOfferDialogHook = ({ isOpen, handleToggle, candidateId }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setErrorData({});
      serviceGetCandidatePRCS({ candidate_id: candidateId }).then((res) => {
        if (!res.error) {
          setJobs(res?.data);
        }
      })
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
    },
    [removeError, form, setForm]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["job_id"];
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
      historyUtils.push(RouteName.CANDIDATES_OFFER, {
        candidate_id: candidateId,
        job_id: form?.job_id,
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle, candidateId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?",form,errors)
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
    jobs
  };
};

export default useExtendOfferDialogHook;
