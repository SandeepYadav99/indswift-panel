import React, { useMemo } from "react";
import {
  serviceGetEmployeeDetails,
  serviceUpdateForeignClaim,
} from "../../../services/ClaimsManagement.service";
import { serviceGetList } from "../../../services/Common.service";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useCallback } from "react";
import nullImg from "../../../assets/img/null.png";
import { dataURLtoFile } from "../../../helper/helper";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import moment from "moment";
import { serviceGetCurrencyList } from "../../../services/AppSettings.service";
import { useParams } from "react-router-dom";
import {
  serviceApproveCLaim,
  serviceDetailsCLaim,
} from "../../../services/Claims.service";

const initialForm = {
  comment: "",
};
const amountKeys = {
  lodging_expenses_amount: "",
  lodging_expenses_amount_usd: "",
  lodging_expenses_amount_eur: "",
  travel_expenses_amount: "",
  travel_expenses_amount_usd: "",
  travel_expenses_amount_eur: "",
  da_ie_expenses_amount: "",
  da_ie_expenses_amount_usd: "",
  da_ie_expenses_amount_eur: "",
  entertainment_expenses_amount: "",
  entertainment_expenses_amount_usd: "",
  entertainment_expenses_amount_eur: "",
  tap_other_expenses_amount: "",
  tap_other_expenses_amount_usd: "",
  tap_other_expenses_amount_eur: "",
};

function useClaimForDetail() {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [currency, setCurrency] = useState("INR");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refundData, setRefundData] = useState(0);
  const [curr, SetCurr] = useState({});
  const [isCP, setIsCp] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [form, setForm] = useState({ ...initialForm });
  const [declaration, setDeclaration] = useState(false);
  const [totalAmount, setTotalAmount] = useState({ ...amountKeys });
  const [officeAmount, setOfficeAmount] = useState(0);
  const [officeAmount2, setOfficeAmount2] = useState(0);
  const [officeAmount3, setOfficeAmount3] = useState(0);
  const [officeAmount4, setOfficeAmount4] = useState(0);
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const lodgeRef = useRef(null);
  const travelRef = useRef(null);
  const daRef = useRef(null);
  const enterRef = useRef(null);
  const otherRef = useRef(null);
  const { id } = useParams();

  const EmpId = window.location.pathname?.includes("/cm/hr/travel/details/")
    ? { employee_id: "63d9267d3d18b8ce6e9b700c" }
    : {};

  // useEffect(() => {
  //   Promise.allSettled([serviceGetCurrencyList()]).then((promises) => {
  //     const Currency = promises[0]?.value?.data;
  //     SetCurr(Currency);
  //   });
  // }, []);

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
      setEmployeeDetails(rest);
      lodgeRef.current?.setData(lodging_expenses);
      travelRef.current?.setData(travel_expenses);
      daRef.current?.setData(da_ie_expenses);
      enterRef.current?.setData(entertainment_expenses);
      otherRef.current?.setData(tap_other_expenses);
      setRefundData(rest?.claim_amount ? Number(rest?.claim_amount) : 0);
      const FixCurrency = [
        {
          currency: "EUR",
          conversion_rate: rest?.imprest_summary?.conversion_rate_eur,
        },
        {
          currency: "USD",
          conversion_rate: rest?.imprest_summary?.conversion_rate_usd,
        },
      ];
      SetCurr([...FixCurrency])
    });
  }, [id]);

  //   useEffect(() => {
  //     if (form?.travel_planner_id?.id) {
  //       if (form?.travel_planner_id?.is_cphi) {
  //         setIsCp(true);
  //       } else {
  //         setIsCp(false);
  //       }
  //     }
  //   }, [form?.travel_planner_id]);

  const changeAmount = useCallback(
    (text) => {
      setTotalAmount({ ...totalAmount, ...text });
      // const t = { ...totalAmount };
      // t[fieldName] = text;
      // setTotalAmount(t);
    },
    [totalAmount, setTotalAmount]
  );

  console.log("total", totalAmount);
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

  console.log("employeeDetails?.imprest", employeeDetails);

  const imprestAmount = useMemo(() => {
    if (employeeDetails?.imprest?.status === "FINANCE_APPROVED") {
      return employeeDetails?.imprest?.amount;
    }
    return 0;
  }, [employeeDetails]);

  const imprestINRAmount = useMemo(() => {
    if (curr?.length > 0 && imprestAmount) {
      if (employeeDetails?.imprest?.currency === "USD") {
        return Number(imprestAmount) * Number(curr[1]?.conversion_rate);
      } else if (employeeDetails?.imprest?.currency === "EUR") {
        return Number(imprestAmount) * Number(curr[0]?.conversion_rate);
      } else {
        return Number(imprestAmount);
      }
    }

    return 0;
  }, [employeeDetails, curr, SetCurr, imprestAmount]);

  console.log("office", officeAmount, officeAmount2);

  const USDAmount = useMemo(() => {
    let total = 0;
    console.log("inside2");
    for (const key in totalAmount) {
      if (key.endsWith("usd")) {
        const numericValue = parseFloat(totalAmount[key]);
        if (!isNaN(numericValue)) {
          total += numericValue;
        }
      }
    }
    return total;
  }, [totalAmount, setTotalAmount]);

  const USDtoINR = useMemo(() => {
    let total = 0;
    if (curr?.length > 0) {
      total = Number(USDAmount) * Number(curr[1]?.conversion_rate);
    }
    return total;
  }, [USDAmount, curr, SetCurr]);

  const EuroAmount = useMemo(() => {
    let total = 0;
    console.log("inside2");
    for (const key in totalAmount) {
      if (key.endsWith("eur")) {
        const numericValue = parseFloat(totalAmount[key]);
        if (!isNaN(numericValue)) {
          total += numericValue;
        }
      }
    }
    return total;
  }, [totalAmount, setTotalAmount]);

  const EurotoINR = useMemo(() => {
    let total = 0;
    if (curr?.length > 0) {
      total = Number(EuroAmount) * Number(curr[0]?.conversion_rate);
    }
    return total;
  }, [EuroAmount, curr, SetCurr]);

  const InrAmount = useMemo(() => {
    let total = 0;
    console.log("inside2");
    for (const key in totalAmount) {
      if (key.endsWith("amount")) {
        const numericValue = parseFloat(totalAmount[key]);
        if (!isNaN(numericValue)) {
          total += numericValue;
        }
      }
    }
    return total;
  }, [totalAmount, setTotalAmount]);

  console.log(USDAmount, "totalAmount", totalAmount);

  const getTotalValue = useMemo(() => {
    let total = 0;
    total = Number(InrAmount) + Number(USDtoINR) + Number(EurotoINR);
    return total;
  }, [InrAmount, USDtoINR, EurotoINR]);

  const getOfficeAmount = useMemo(() => {
    const value =
      Number(officeAmount ? officeAmount : 0) +
      Number(officeAmount2 ? officeAmount2 : 0) +
      Number(officeAmount3 ? officeAmount3 : 0) +
      Number(officeAmount4 ? officeAmount4 : 0);
    return value ? value : 0;
  }, [officeAmount, officeAmount2, officeAmount3, officeAmount4]);

  console.log(
    ">>>>",
    officeAmount,
    officeAmount2,
    officeAmount3,
    officeAmount4,
    getOfficeAmount
  );
  const getRefundAmount = useMemo(() => {
    return imprestINRAmount
      ? Number(getTotalValue) -
          Number(getOfficeAmount) -
          Number(imprestINRAmount)
      : Number(getTotalValue) - Number(getOfficeAmount);
  }, [
    form?.travel_planner_id,
    getTotalValue,
    officeAmount,
    officeAmount2,
    imprestINRAmount,
    getOfficeAmount,
  ]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsLoading(true);
      setIsSubmitting(true);
      const summery = {
        conversion_rate_usd: curr[1]?.conversion_rate,
        conversion_rate_eur: curr[0]?.conversion_rate,
        conversion_rate_inr: 1,
        amount_usd: USDAmount,
        amount_eur: EuroAmount,
        amount_inr: InrAmount,
        converted_amount_usd: USDtoINR,
        converted_amount_eur: EurotoINR,
        converted_amount_inr: InrAmount,
      };
      const lodgeData = lodgeRef.current.getData();
      const daData = daRef.current.getData();
      const ExpensesData = travelRef.current.getData();
      const enterData = enterRef.current.getData();
      const otherData = otherRef.current.getData();

      const objData = {
        ...form,
        review_id: id,
        travel_claim_update: {
          lodging_expenses: lodgeData,
          travel_expenses: ExpensesData,
          da_ie_expenses: daData,
          entertainment_expenses: enterData,
          tap_other_expenses: otherData,
          total_amount: Number(refundData),
          refund_amount: Number(getRefundAmount),
          imprest_amount: imprestAmount,
          total_expense: getTotalValue ? getTotalValue : 0,
          office_expense: Number(getOfficeAmount),
          imprest_converted_amount: Number(imprestINRAmount),
          self_expense: Number(getTotalValue) - Number(getOfficeAmount),
          ...totalAmount,
          imprest_summary: summery,
        },
      };
      serviceApproveCLaim({ ...objData, ...EmpId }).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsLoading(false);
        setIsSubmitting(false);
      });
    }
  }, [
    form,
    isSubmitting,
    setIsSubmitting,
    totalAmount,
    setTotalAmount,
    currency,
    setCurrency,
    getTotalValue,
    officeAmount,
    setOfficeAmount,
    officeAmount2,
    setOfficeAmount2,
    getRefundAmount,
    isCP,
    imprestAmount,
    imprestINRAmount,
    curr,
    SetCurr,
    USDAmount,
    EuroAmount,
    InrAmount,
    USDtoINR,
    EurotoINR,
    getOfficeAmount,
    refundData,
    setRefundData
  ]);
  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);

  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);
  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const startDate = useMemo(() => {
    if (typeof form?.travel_planner_id === "object") {
      return form?.travel_planner_id?.start_date;
    }
  }, [form?.travel_planner_id]);

  const endDate = useMemo(() => {
    if (typeof form?.travel_planner_id === "object") {
      return form?.travel_planner_id?.end_date;
    }
  }, [form?.travel_planner_id]);

  const CoPass = useMemo(() => {
    if (typeof form?.travel_planner_id === "object") {
      return form?.travel_planner_id?.co_passengers;
    }
  }, [form?.travel_planner_id]);

  const tourType = useMemo(() => {
    if (typeof form?.travel_planner_id === "object") {
      return form?.travel_planner_id?.tour_type;
    }
  }, [form?.travel_planner_id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValid = travelRef.current.isValid();
    const islodgeValid = lodgeRef.current.isValid();
    const isdaRefValid = daRef.current.isValid();
    const isenterValid = enterRef.current.isValid();
    const isOtherValid = otherRef.current.isValid();
    console.log(
      "valid",
      isIncludesValid,
      islodgeValid,
      isdaRefValid,
      isenterValid,
      isOtherValid
    );
    if (
      !isIncludesValid ||
      !isOtherValid ||
      !islodgeValid ||
      !isdaRefValid ||
      !isenterValid ||
      Object.keys(errors).length > 0
    ) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    submitToServer,
    getTotalValue,
    officeAmount,
    setOfficeAmount,
    officeAmount2,
    setOfficeAmount2,
    getRefundAmount,
    isCP,
    curr,
    SetCurr,
    USDAmount,
    EuroAmount,
    InrAmount,
    USDtoINR,
    EurotoINR,
    getOfficeAmount,
    refundData,
    setRefundData
  ]);

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
  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  console.log("part", officeAmount2);
  return {
    employeeDetails,
    employees,
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    errorData,
    handleReset,
    declaration,
    setDeclaration,
    travelRef,
    otherRef,
    lodgeRef,
    daRef,
    enterRef,
    startDate,
    endDate,
    CoPass,
    changeAmount,
    tourType,
    setCurrency,
    getTotalValue,
    setOfficeAmount,
    officeAmount,
    setOfficeAmount2,
    officeAmount2,
    getRefundAmount,
    imprestAmount,
    isCP,
    InrAmount,
    EuroAmount,
    USDAmount,
    USDtoINR,
    EurotoINR,
    imprestINRAmount,
    getOfficeAmount,
    officeAmount3,
    setOfficeAmount3,
    setOfficeAmount4,
    id,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    isSubmitting,
    refundData,
    setRefundData,
  };
}

export default useClaimForDetail;
