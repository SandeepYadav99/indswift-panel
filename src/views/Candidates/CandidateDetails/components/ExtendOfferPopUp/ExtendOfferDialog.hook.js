import { useCallback, useEffect, useState } from "react";
import { serviceGetCandidatePRCS } from "../../../../../services/Candidate.service";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";
import LogUtils from "../../../../../libs/LogUtils";

const initialForm={
  job_id:"",
  vacancy_id:'',
};
const useExtendOfferDialogHook = ({ isOpen, handleToggle, candidateId }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [IsReoccuring,setIsReoccuring]= useState(false)
  const [employeeList,setEmployeeList]=useState([])
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

  useEffect(() => {
    if (jobs?.length > 0) {
      const CheckReoccuring = jobs.findIndex(
        (item) => item?.job_openings?.id === form?.job_id
      );
      const getValue=jobs[CheckReoccuring]
      setEmployeeList(getValue?.vacancies)
      setIsReoccuring(getValue?.job_openings?.is_recurring)
    }
  }, [form.job_id,IsReoccuring,jobs]);
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
     if (IsReoccuring && form['vacancy_id']?.length === 0 || form['vacancy_id'] === null){
      errors['vacancy_id'] = true;
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData,IsReoccuring]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      const index = employeeList.findIndex(val => val.id === form?.vacancy_id);
      let replacingId = null;
      if (index >= 0) {
        const item = employeeList[index];
        replacingId = item?.employee?.id ? item?.employee?.id : null;
      }
      LogUtils.log('submitToServer', index, replacingId, form?.vacancy_id)
      historyUtils.push(RouteName.CANDIDATES_OFFER, {
        candidate_id: candidateId,
        job_id: form?.job_id,
        replacing_id: replacingId,
        vacancy_id: form?.vacancy_id ? form?.vacancy_id : null,
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle, candidateId]);
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
    IsReoccuring,
    jobs,
    employeeList
  };
};

export default useExtendOfferDialogHook;
