import { useEffect, useState } from "react";
import { useCallback } from "react";
import LogUtils from "../../../../libs/LogUtils";
import { isAadhar } from "../../../../libs/RegexUtils";

const initialForm = {
  name: "",
  relation: "",
  dob: "",
  aadhar_no: "",
};

function useValancyField({ type }) {
  const [enableField,setEnableField]=useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [form, setForm] = useState({ ...initialForm });
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ['name','relation','dob','aadhar_no'];
    if (enableField) {
      required.forEach((val) => {
        if (!form?.[val]) {
          errors[val] = true;
        }
      });
    }
    if (form?.aadhar_no && !isAadhar(form?.aadhar_no)) {
      errors["aadhar_no"] = true;
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData,enableField]);

  useEffect(()=>{
    const hasData = Object.values(form).some(value => !!value);
    setEnableField(hasData);
  },[form?.name])

  const isFormValid = useCallback(() => {
    const errors = checkFormValidation();
    LogUtils.log("isFormValidInside", errors);
    if (Object.keys(errors)?.length > 0) {
      setErrorData(errors);
      return false;
    }
    return true;
  }, [checkFormValidation,enableField]);

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
      setIsChanged(true);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    setForm,
    errorData,
    changeTextData,
    onBlurHandler,
    handleReset,
    isFormValid,
    enableField,
    setEnableField,
    isChanged
  };
}

export default useValancyField;
