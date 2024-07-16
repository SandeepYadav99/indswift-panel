import React, { useCallback, useState } from "react";

const initialForm = {
  year: "",
  month:""
};

const usePayslipsGenerationFiledHook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [];
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      } else if (["emp_code"].indexOf(val) < 0) {
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

  return {
    form,
    changeTextData,
   
  };
};

export default usePayslipsGenerationFiledHook;
