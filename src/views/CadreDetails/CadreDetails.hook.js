import React from "react";
import { serviceGetCadreEntitlementDetails } from "../../services/CadreDetail.service";
import { useState } from "react";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCallback } from "react";
import LogUtils from "../../libs/LogUtils";
const initialForm = {
  is_show: true,
  max_claim: 2,
  max_value: 21,
};
function useCadreDetailsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  // useEffect(() => {
  //   if (id) {
  //     serviceCandidateEditData({ id: id }).then((res) => {
  //       if (!res.error) {
  //         const data = res?.data?.details;
  //         setEditData(data);
  //         const form = {
  //           ...initialForm,
  //         };
  //         Object.keys(initialForm).forEach((key) => {
  //           if (key !== "document" && data?.[key]) {
  //             form[key] = data?.[key];
  //           }
  //         });
  //         setForm({
  //           ...initialForm,
  //           ...form,
  //         });
  //       }
  //     });
  //   }
  // }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["max_claim", "max_value"];

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
  }, [form, errorData]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();

      // let req = serviceUpdateMarrigeClaims;
      // req(fd).then((res) => {
      //   if (!res.error) {
      //     historyUtils.goBack();
      //   } else {
      //     SnackbarUtils.error(res?.message);
      //   }
      //   setIsSubmitting(false);
      // });
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    console.log("servercall");
    // submitToServer();
  }, [checkFormValidation, setErrorData, form]);

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
      LogUtils.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };

      t[fieldName] = text;
      setForm(t);
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
    errorData,
    changeTextData,
    onBlurHandler,
     
  };
}

export default useCadreDetailsList;
