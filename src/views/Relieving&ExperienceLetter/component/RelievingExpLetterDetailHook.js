import { useCallback, useEffect } from "react";
import { useState } from "react";
import {
  serviceRelievingExpLetterApprival,
  serviceRelievingExpLetterDetail,
} from "../../../services/Letters.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";

const initialForm = {
  general_conduct: "",
};

const useRelievingExpLetterDetail = () => {
  const [relievingExpDetails, setRelievingExpDetails] = useState({});
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    serviceRelievingExpLetterDetail({ id: id }).then((res) => {
      if (!res?.error) {
        setRelievingExpDetails(res?.data?.details);
      }
    });
  }, [id]);

  const isSiteHRApprovedPending =
  relievingExpDetails?.experienceLetter?.status === "SITE_HR_APPROVED" &&
  relievingExpDetails?.status === "PENDING";

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [];

    if (isSiteHRApprovedPending) {
      required.push("general_conduct");
    }
 
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  }, [form, errorData, relievingExpDetails]);

  const submitToApprove = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const updatedData = {
      review_id: id,
      //  reason: "Terminated",
      general_conduct: form?.general_conduct,
    };

    try {
      const req = serviceRelievingExpLetterApprival(updatedData);
      const res = await req;

      if (!res.error) {
        historyUtils.goBack();
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, id]); // EmpID

  const handleSubmitToApprove = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      await submitToApprove();
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    submitToApprove,
    relievingExpDetails,
  ]);

  const changeTextData = useCallback(
    (value, fieldName) => {
      const fieldMappings = {
        general_conduct: "general_conduct",
      };

      if (fieldMappings.hasOwnProperty(fieldName)) {
        setForm((prevForm) => ({
          ...prevForm,
          [fieldMappings[fieldName]]: value,
        }));
        removeError(fieldName);
      }
    },
    [setForm, removeError, form, relievingExpDetails]
  );

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  return {
    relievingExpDetails,
    changeTextData,
    form,
    handleSubmitToApprove,
    errorData,
  };
};
export default useRelievingExpLetterDetail;
