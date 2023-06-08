import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import {
  serviceApproveTravelAuth,
  serviceGetTravelAuthDetails,
} from "../../../services/TravelAuth.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";

const initialForm = {
  exception_approved: false,
  exception_value: "",
  comment: "",
};

function useTravelAuthDetail() {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editData, setEditData] = useState(null);
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const travelRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    let req = serviceGetTravelAuthDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [];
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
      // const fd = new FormData();
      // Object.keys(form).forEach((key) => {
      //   fd.append(key, form[key]);
      // });
      // const ExpensesData = travelRef.current.getData();
      // ExpensesData.forEach((val) => {
      //   if (val?.travel_documents) {
      //     fd.append("travel_documents", val?.travel_documents);
      //   }
      // });
      // fd.append("travel_details", JSON.stringify(ExpensesData));

      const objData = {
        ...form,
        exception_approved: form.exception_approved === "APPROVED",
        review_id:id
      };

      let req = serviceApproveTravelAuth;
      req(objData).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id]);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("---->", errors);
    // const isIncludesValid = travelRef.current.isValid();
    // !isIncludesValid ||
    if ( Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, submitToServer]);

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
      // LogUtils.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "exception_value") {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  console.log("form", form);
  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );
  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);

  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    errorData,
    editData,
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    travelRef
  };
}

export default useTravelAuthDetail;
