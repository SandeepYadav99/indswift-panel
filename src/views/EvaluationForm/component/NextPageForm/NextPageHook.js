import React from "react";
import { useState } from "react";
import { useCallback } from "react";

function NextPageHook() {
  const initialForm = {
    overall: {
      value: null,
      note: "",
    },
    is_declaration: false,
  };
  const [form, setForm] = useState({ ...initialForm });
  const [isDeclarationChecked, setIsDeclarationChecked] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isResetDialog, setIsResetDialog] = useState(false);
  const toggleResetDialog = useCallback(() => {
    setIsResetDialog((e) => !e);
  }, [isResetDialog]);
  const handleRatingChange = useCallback(
    (type, text) => {
      const t = { ...form };
      t[type] = text;
      setForm(t);
    },
    [form, setForm, isDeclarationChecked]
  );

  console.log(",.,", form, "ll>", isDeclarationChecked);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (!errors) {
      toggleResetDialog();
      // submitToServer();
    } else {
      const message = Object.keys(errors).join(", ");
      console.log("===errors", message, errors);
      // SnackbarUtils.error('No Data Changed');
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,
  ]);
  const handleDeclarationCheckbox = (e) => {
    setIsDeclarationChecked((e) => !e);
    const t = { ...form };
    t["is_declaration"] = e.target.checked;
    setForm(t);
  };
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    ["overall"].forEach((val) => {
      if (!form?.[val]["value"]) {
        errors[val] = true;
      }
    });
    if (!form.is_declaration) {
      errors["is_declarations"] = true;
    }
    console.log({ errors, form });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, isDeclarationChecked]);
  return {
    isResetDialog,
    form,
    errorData,
    toggleResetDialog,
    handleRatingChange,
    handleSubmit,
    isDeclarationChecked,
    setIsDeclarationChecked,
    handleDeclarationCheckbox,
  };
}

export default NextPageHook;
