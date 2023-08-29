import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { serviceApproveCLaim, serviceDetailsCLaim } from "../../../services/Claims.service";
import { useState } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import { useRef } from "react";
import RouteName from "../../../routes/Route.name";

const initialForm = {
  comment: "",
};

const amountKeys = {
  lodging_expenses_amount: "",
  travel_expenses_amount: "",
  da_ie_expenses_amount: "",
  entertainment_expenses_amount: "",
  tap_other_expenses_amount: "",
};

function useTravelClaimListDetail() {
  const [form, setForm] = useState({ ...initialForm });
  const [totalAmount, setTotalAmount] = useState({ ...amountKeys });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editData, setEditData] = useState(null);
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const lodgeRef = useRef(null);
  const travelRef = useRef(null);
  const daRef = useRef(null);
  const enterRef = useRef(null);
  const otherRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    let req = serviceDetailsCLaim({ id: id });
    req.then((data) => {
      const {
        lodging_expenses,
        travel_expenses,
        da_ie_expenses,
        entertainment_expenses,
        tap_other_expenses,
        ...rest
      } = data?.data?.details;
      setEmployeeDetail(rest);
      lodgeRef.current?.setData(lodging_expenses);
      travelRef.current?.setData(travel_expenses);
      daRef.current?.setData(da_ie_expenses);
      enterRef.current?.setData(entertainment_expenses);
      otherRef.current?.setData(tap_other_expenses);
    });
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["comment"];
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
  }, [form, errorData, employeeDetail]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const lodgeData = lodgeRef.current.getData();
      const TravelData = travelRef.current.getData();
      const DAData = daRef.current.getData();
      const EnterData = enterRef.current.getData();
      const OtherData = otherRef.current.getData();
      const sum = Object.values(totalAmount).reduce((acc, value) => {
        if (value !== "") {
          acc += parseFloat(value);
        }
        return acc;
      }, 0);
      const objData = {
        ...form,
        review_id: id,
        travel_claim_update: {
          lodging_expenses: lodgeData,
          travel_expenses: TravelData,
          da_ie_expenses: DAData,
          entertainment_expenses: EnterData,
          tap_other_expenses: OtherData,
          total_amount: sum,
          ...totalAmount,
        },
      };
      console.log("Payload", objData);
      serviceApproveCLaim({ ...objData}).then((res) => {
        if (!res.error) {
          historyUtils.push(RouteName.CLAIMS_LIST);
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, id, totalAmount, setTotalAmount]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isLodgeValid = lodgeRef.current.isValid();
    const isTravelValid = travelRef.current.isValid();
    const isDAeValid = daRef.current.isValid();
    const isEnterValid = enterRef.current.isValid();
    const isOtherValid = otherRef.current.isValid();

    console.log("---->", errors);

    if (
      !isLodgeValid ||
      !isTravelValid ||
      !isDAeValid ||
      !isEnterValid ||
      !isOtherValid ||
      Object.keys(errors).length > 0
    ) {
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

  const changeAmount = useCallback(
    (text, fieldName) => {
      const t = { ...totalAmount };
      t[fieldName] = text;
      setTotalAmount(t);
    },
    [totalAmount, setTotalAmount]
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
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    errorData,
    editData,
    lodgeRef,
    travelRef,
    daRef,
    enterRef,
    otherRef,
    changeAmount,
  };
}

export default useTravelClaimListDetail;
