import { useCallback, useState } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";

const KEYS = [
  "experience",
  "educational",
  "exposure",
  "expertise",
  "communication",
  "candidate",
  "knowledge",
  "teambuilding",
  "initiative",
];
const initialForm = {
  experience: { value: null },
  educational: { value: null },
  exposure: { value: null },
  expertise: { value: null },
  communication: { value: null },
  candidate: { value: null },
  knowledge: { value: null },
  teambuilding: { value: null },
  initiative: { value: null },
};

function UseExitForm({ handleNext }) {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});

  const handleRatingChange = useCallback(
    (type, text) => {
      const t = { ...form };
      t[type] = text;
      setForm(t);
      removeError(type);
    },
    [form, setForm, errorData]
  );
  console.log(">>>>", form);
  const removeError = useCallback(
    (key) => {
      if (errorData?.[key]) {
        const t = { ...errorData };
        delete t[key];
        setErrorData(t);
      }
    },
    [setErrorData, errorData]
  );
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    KEYS.forEach((val) => {
      if (!form?.[val]["value"]) {
        errors[val] = true;
      }
    });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length === 0) {
      handleNext(form);
    } else {
      const message = Object.keys(errors).join(", ");
      SnackbarUtils.error(`Please provide the rating for ${message} fields`);
      setErrorData(errors);
      // SnackbarUtils.error('No Data Changed');
    }
  }, [checkFormValidation, setErrorData, form, handleNext]);

  return {
    handleRatingChange,
    handleSubmit,
    errorData,
    // changeTextData,
  };
}

export default UseExitForm;
