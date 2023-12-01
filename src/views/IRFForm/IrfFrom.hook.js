import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import {
  serviceGetIrfDetails,
  serviceUpdateIrfForm,
} from "../../services/Irf.service";

function UseIrfFrom() {
  const [isChecked, setIsChecked] = React.useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [data, setData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const travelRef = useRef(null);
  const otherRef = useRef(null);
  const storedValue = sessionStorage.getItem("CANDIDATE_IRF_ID");
  useEffect(() => {
    if (storedValue) {
      let req = serviceGetIrfDetails({ candidate_id: storedValue });
      req.then((res) => setData({ ...res?.data?.details }));
    }
  }, []);
  const handleSubmit = useCallback(async () => {
    const isIncludesValid = travelRef.current.isValid();
    const isOtherValid = otherRef.current.isValid();

    if (!isIncludesValid || !isOtherValid) {
      return true;
    }
    submitToServer();
  }, [submitToServer, setIsChecked, isChecked, data, setData]);
  
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      const ExpensesData = travelRef.current.getData();
      ExpensesData.forEach((val) => {
        if (val?.payment_proof) {
          fd.append("payment_proof", val?.payment_proof);
        }
      });
      const { bill_amount, interview_date } = ExpensesData[0];
      delete ExpensesData[0].bill_amount;
      delete ExpensesData[0].interview_date;
      delete ExpensesData[0].payment_proof;

      fd.append("travel_details", JSON.stringify(ExpensesData[0]));
      const otherExpensesData = otherRef.current.getData();
      fd.append("bank_details", JSON.stringify(otherExpensesData[0]));
      fd.append("bill_amount", bill_amount);
      fd.append("interview_date", interview_date);
      fd.append("candidate_id", data?.id);
      let req = serviceUpdateIrfForm;
      req(fd).then((res) => {
        if (!res.error) {
          historyUtils.push(RouteName.EAF_SUCCESS);
          // historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [isSubmitting, setIsSubmitting, setIsChecked, isChecked, data, setData]);
  return {
    travelRef,
    otherRef,
    handleSubmit,
    declaration,
    setDeclaration,
    data,
  };
}

export default UseIrfFrom;
