import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import {
  serviceApproveTravelAuth,
  serviceGetTravelAuthDetails,
} from "../../../services/TravelAuth.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";

const initialForm = {
  exception_approved: "",
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
  const [enableType,setEnableType]=useState(true)
  const [CheckexceptionRejected,setCheckexceptionRejected]=useState(null)
  const travelRef = useRef(null);

  const { id } = useParams();
  

  useEffect(() => {
    let req = serviceGetTravelAuthDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
      setEnableType(data?.data?.details?.travelPlanner?.exception_required)
      setCheckexceptionRejected(data?.data?.details?.travelPlanner?.exception?.status === 'REJECTED')
    });
  }, [id]);

  const fieldStatusEnabled = [
    "CORPORATE_HR_APPROVED",
    "ADMIN_AUTHORIZED",
  ].includes(employeeDetail?.travelPlanner?.status);

  const TypeEnabledStatus = [
    "CORPORATE_HR_APPROVED",
    "EXCEPTION_APPROVED" ,
    "ADMIN_AUTHORIZED"
  ].includes(employeeDetail?.travelPlanner?.status);

  console.log('valid',enableType , !TypeEnabledStatus , !CheckexceptionRejected,TypeEnabledStatus)

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
    if(enableType && !TypeEnabledStatus && !CheckexceptionRejected){
      if (form.exception_approved?.length === 0) {
        errors["exception_approved"] = true;
        SnackbarUtils.error("Please Approve or Reject the Exception");
    }
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData,employeeDetail,enableType,CheckexceptionRejected]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const objData = {
        ...form,
        exception_approved: form.exception_approved === "APPROVED",
        review_id: id,
      };
      const objKeys = Object.keys(objData);
      const fd = new FormData();
      objKeys.forEach((key) => {
        fd.append(key, objData[key]);
      });

      if (fieldStatusEnabled) {
        const ExpensesData = travelRef.current.getData();
        ExpensesData.forEach((val) => {
          if (val?.voucher_documents) {
            fd.append("voucher_documents", val?.voucher_documents);
          }
        });
        fd.append("voucher_details", JSON.stringify(ExpensesData));
      }

      let req = serviceApproveTravelAuth;
      req(fd).then((res) => {
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
    const isIncludesValid = fieldStatusEnabled
      ? travelRef.current.isValid()
      : true;
    if (!isIncludesValid || Object.keys(errors).length > 0) {
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
    travelRef,
    fieldStatusEnabled,
    enableType,
    TypeEnabledStatus,
    CheckexceptionRejected
  };
}

export default useTravelAuthDetail;
