import React, { useEffect, useState } from "react";
import {
  serviceGetCurrencyList,
  serviceGetUscScriptUpdate,
} from "../../../../../services/AppSettings.service";
import RouteName from "../../../../../routes/Route.name";
import historyUtils from "../../../../../libs/history.utils";
import { useCallback } from "react";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const initialForm = {
  salary_notes: "",
  effective_date: "",
};

function useCurrencyHook() {
  const [UscData, setUscData] = useState([]);
  const [isUpdateDialog, setIsUpdateDialog] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [locationId, setlocationId] = useState("");
  useEffect(() => {
    let dataValues = serviceGetCurrencyList();
    dataValues
      .then((data) => {
        setUscData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["salary_notes", "effective_date"];
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
  }, [form, errorData]);

  const toggleStatusDialog = useCallback(
    (data) => {
      setIsUpdateDialog((e) => !e);
      console.log('data?.location_id',data)
      if (data?.location_id) {
        setlocationId(data?.location_id);
      } else {
        setlocationId("");
      }
    },
    [isUpdateDialog, locationId]
  );

  console.log("locationId", locationId);
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceGetUscScriptUpdate({
        location_id: locationId,
        ...form,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Updated Successfully");
          // window.location.reload();
          toggleStatusDialog();
          // historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, toggleStatusDialog, locationId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer,locationId]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleViewUpdate = useCallback((data) => {
    historyUtils.push(`${RouteName.CURRENCY_UPDATE}${data?.id}`);
  }, []);

  return {
    UscData,
    handleViewUpdate,
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isUpdateDialog,
    toggleStatusDialog,
    isSubmitting
  };
}

export default useCurrencyHook;
