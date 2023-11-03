import React, { useMemo } from "react";
import {
  serviceGetEmployeeDetails,
  serviceUpdateForeignClaim,
  serviceUpdateIntClaim,
} from "../../../../../services/ClaimsManagement.service";
import { serviceGetList } from "../../../../../services/Common.service";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useCallback } from "react";
import nullImg from "../../../../../assets/img/null.png";
import { dataURLtoFile } from "../../../../../helper/helper";
import historyUtils from "../../../../../libs/history.utils";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import moment from "moment";
import { serviceGetCurrencyList } from "../../../../../services/AppSettings.service";

const initialForm = {
  travel_planner_id: "",
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

function useClaimForCard() {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [currency, setCurrency] = useState("INR");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const lodgeRef = useRef(null);
  const travelRef = useRef(null);
  const daRef = useRef(null);
  const enterRef = useRef(null);
  const otherRef = useRef(null);

  const {
    user: { emp_code, user_id },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    Promise.allSettled([
      serviceGetEmployeeDetails({ code: emp_code }),
      serviceGetList(["CLAIM_TAP"], {
        employee_id: user_id,
        tour_type: "FOREIGN",
      }),
      serviceGetCurrencyList(),
    ]).then((promises) => {
      const empDetail = promises[0]?.value?.data;
      const listData = promises[1]?.value?.data;
      const Currency = promises[2]?.value?.data;
      setEmployeeDetails(empDetail);
      setEmployees(listData?.CLAIM_TAP);
      SetCurr(Currency);
    });
  }, []);

  useEffect(() => {
    if (form?.travel_planner_id?.id) {
      if (form?.travel_planner_id?.is_cphi) {
        setIsCp(true);
      } else {
        setIsCp(false);
      }
    }
  }, [form?.travel_planner_id]);
  const changeAmount = useCallback(
    (text, fieldName) => {
      const t = { ...totalAmount };
      t[fieldName] = text;
      setTotalAmount(t);
    },
    [totalAmount, setTotalAmount]
  );

  console.log("total", totalAmount);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["travel_planner_id"];
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

  const imprestAmount = useMemo(() => {
    if (form?.travel_planner_id?.myImprest?.status === "FINANCE_APPROVED") {
      return form?.travel_planner_id?.myImprest?.amount;
    }
    return 0;
  }, [form]);

  const imprestINRAmount = useMemo(() => {
    if (curr?.length > 0 && form?.travel_planner_id?.myImprest?.amount) {
      if (form?.travel_planner_id?.myImprest?.currency === "USD") {
        return Math.round(
          Number(form?.travel_planner_id?.myImprest?.amount) *
            Number(curr[1]?.conversion_rate)
        );
      } else if (form?.travel_planner_id?.myImprest?.currency === "EUR") {
        return Math.round(
          Number(form?.travel_planner_id?.myImprest?.amount) *
            Number(curr[0]?.conversion_rate)
        );
      } else {
        return Math.round(Number(form?.travel_planner_id?.myImprest?.amount));
      }
    }

    return 0;
  }, [form, curr, SetCurr, imprestAmount]);

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
    return Math.round(total);
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
    return Math.round(total);
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
    return Math.round(total);
  }, [InrAmount, USDtoINR, EurotoINR]);

  const getOfficeAmount = useMemo(() => {
    const value =
      Number(officeAmount ? officeAmount : 0) +
      Number(officeAmount2 ? officeAmount2 : 0) +
      Number(officeAmount3 ? officeAmount3 : 0) +
      Number(officeAmount4 ? officeAmount4 : 0);
    return value ? Math.round(value) : 0;
  }, [officeAmount, officeAmount2, officeAmount3, officeAmount4]);

  const getRefundAmount = useMemo(() => {
    return imprestINRAmount
      ? Math.round(
          Number(getTotalValue) -
            Number(getOfficeAmount) -
            Number(imprestINRAmount)
        )
      : Math.round(Number(getTotalValue) - Number(getOfficeAmount));
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
      const fd = new FormData();
      fd.append("travel_planner_id", form?.travel_planner_id?.id);
      Object.keys(totalAmount).forEach((key) => {
        fd.append(key, totalAmount[key]);
      });
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
      fd.append("total_amount", getRefundAmount);
      fd.append("imprest_amount", imprestAmount);
      fd.append("refund_amount", getRefundAmount);
      fd.append("imprest_converted_amount", imprestINRAmount);
      const lodgeData = lodgeRef.current.getData();

      let modifiedArr = lodgeData?.map((item) => {
        return {
          ...item,
          shared_with: item?.shared_with?.map((person) => person?.id),
        };
      });
      lodgeData.forEach((val) => {
        if (val?.lodging_voucher) {
          fd.append("lodging_voucher", val?.lodging_voucher);
        }
        if (val?.lodging_payment_proof) {
          fd.append("lodging_payment_proof", val?.lodging_payment_proof);
        } else {
          const file = dataURLtoFile(nullImg, "null.png");
          fd.append("lodging_payment_proof", file);
        }
      });

      fd.append("lodging_expenses", JSON.stringify(modifiedArr));
      fd.append("imprest_summary", JSON.stringify(summery));

      const ExpensesData = travelRef.current.getData();
      ExpensesData.forEach((val) => {
        if (val?.travel_payment_proof) {
          fd.append("travel_payment_proof", val?.travel_payment_proof);
        } else {
          const file = dataURLtoFile(nullImg, "null.png");
          fd.append("travel_payment_proof", file);
        }
        if (val?.travel_voucher) {
          fd.append("travel_voucher", val?.travel_voucher);
        } else {
          const file = dataURLtoFile(nullImg, "null.png");
          fd.append("travel_payment_proof", file);
        }
      });
      fd.append("travel_expenses", JSON.stringify(ExpensesData));

      const daData = daRef.current.getData();
      daData.forEach((val) => {
        if (val.ie_payment_proof) {
          fd.append("ie_payment_proof", val?.ie_payment_proof);
        } else {
          const file = dataURLtoFile(nullImg, "null.png");
          fd.append("ie_payment_proof", file);
        }
        if (val.da_payment_proof) {
          fd.append("da_payment_proof", val?.da_payment_proof);
        } else {
          const file = dataURLtoFile(nullImg, "null.png");
          fd.append("da_payment_proof", file);
        }
      });
      const modifiedData = daData.map((item) => {
        return {
          ...item,
          start_time: moment(item.start_time).format("hh:mm A"),
          end_time: moment(item.end_time).format("hh:mm A"),
        };
      });
      fd.append("da_ie_expenses", JSON.stringify(modifiedData));
      const enterData = enterRef.current.getData();
      enterData.forEach((val) => {
        if (val?.entertainment_payment_proof) {
          fd.append(
            "entertainment_payment_proof",
            val?.entertainment_payment_proof
          );
        }
      });
      fd.append("entertainment_expenses", JSON.stringify(enterData));
      fd.append("total_expense", getTotalValue ? getTotalValue : 0);
      fd.append("office_expense", Number(getOfficeAmount));
      fd.append(
        "self_expense",
        Number(getTotalValue) - Number(getOfficeAmount)
      );

      const otherData = otherRef.current.getData();
      otherData.forEach((val) => {
        if (val?.other_payment_proof) {
          fd.append("other_payment_proof", val?.other_payment_proof);
        }
      });
      fd.append("tap_other_expenses", JSON.stringify(otherData));
      let req = serviceUpdateForeignClaim;
      req(fd).then((res) => {
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
  ]);

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
    isSubmitting,
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
    curr,
    USDtoINR,
    EurotoINR,
    imprestINRAmount,
    getOfficeAmount,
    officeAmount3,
    setOfficeAmount3,
    setOfficeAmount4,
  };
}

export default useClaimForCard;
