import { useCallback, useEffect, useState } from "react";
import {
  serviceGetCandidatePRCList,
  serviceGetCandidatePRCUpdate,
} from "../../../../../services/Candidate.service";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";
import LogUtils from "../../../../../libs/LogUtils";
import useDebounce from "../../../../../hooks/DebounceHook";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const initialForm = {
  code: "",
};
const useUpdatePRCDialogHook = ({ isOpen, handleToggle, candidateId }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [IsReoccuring, setIsReoccuring] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const codeDebouncer = useDebounce(form?.code, 500);
  const [isPRCDetailFetched, setIsPRCDetailFetched] = useState(false);

  const checkCodeValidation = useCallback(() => {
    serviceGetCandidatePRCList({ code: form?.code }).then((res) => {
      const ed = { ...errorData };
      const dataValue = res?.data;
      if (!res.error) {
        delete ed["code"];
        setForm({ ...form, ...dataValue });
        setIsPRCDetailFetched(true)
      } else {
        ed["code"] = "Job Id does not Exist";
        setForm({
          code: form?.code,
         
        });
        
      }
      setErrorData(ed);
    });
  }, [errorData, setErrorData, form?.code]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);

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
    let required = ["code"];
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
  }, [form, errorData, IsReoccuring]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      console.log("form", form);
      let req = serviceGetCandidatePRCUpdate({
        job_id: form?.id,
        candidate_id: candidateId,
      });
      req.then((res) => {
        if (!res.error) {
          handleToggle();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
      LogUtils.log("submitToServer");
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
    employeeList,
    isPRCDetailFetched
  };
};

export default useUpdatePRCDialogHook;
