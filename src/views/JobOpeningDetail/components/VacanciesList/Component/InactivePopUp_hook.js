import { useCallback, useEffect, useState } from "react";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { useDispatch } from "react-redux";
import {actionGetJobOpeningVacancies, actionGetMarkInactive} from "../../../../../actions/JobOpeningDetail.action";
import {serviceVacanciesInactive} from "../../../../../services/JobOpenings.service";

const initialForm = {
  reason: "",
};

const useInactivePopUp_hook = ({ isOpen, handleToggle, candidateId, jobId }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
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

    },
    [removeError, form, setForm]
  );


  const handleSubmit = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);

      if (candidateId) {
          serviceVacanciesInactive({ vacancy_id: candidateId , reason: form?.reason}).then(() => {
              handleToggle();
              SnackbarUtils.success("Inactive successfully");
              dispatch(actionGetJobOpeningVacancies(jobId));
          });

      }
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle,  dispatch, jobId, candidateId]);


  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  return {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
  };
};

export default useInactivePopUp_hook;
