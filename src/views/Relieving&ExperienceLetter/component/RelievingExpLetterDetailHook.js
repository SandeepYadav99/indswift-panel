import { useCallback, useEffect } from "react";
import { useState } from "react";
import { serviceRelievingExpLetterApprival, serviceRelievingExpLetterDetail } from "../../../services/Letters.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";

const initialForm = {
  general_conduct: "",
};

const useRelievingExpLetterDetail = () => {
  const [relievingExpDetails, setRelievingExpDetails] = useState({});
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    serviceRelievingExpLetterDetail({ id: "65449ac16b9e7fe71fdfcb0b" }).then(
      (res) => {
        if (!res?.error) {
          setRelievingExpDetails(res?.data?.details);
        }
      }
    );
  }, []);

  const submitToApprove = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const updatedData = {
      review_id: "",
      reason: "Terminated",
      general_conduct: form?.general_conduct
  }

    try {
      const req = serviceRelievingExpLetterApprival(updatedData);
      const res = await req;

      if (!res.error) {
        historyUtils.goBack();
        // window.location.reload();
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
     
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting]); // EmpID

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
    [setForm, removeError]
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
    submitToApprove
  };
};
export default useRelievingExpLetterDetail;
