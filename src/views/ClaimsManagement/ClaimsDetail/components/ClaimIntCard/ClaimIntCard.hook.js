import React, { useMemo } from "react";
import {
  serviceGetEmployeeDetails,
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

const initialForm = {
  travel_planner_id: "",
};
const amountKeys = {
  lodging_expenses_amount: "",
  travel_expenses_amount: "",
  da_ie_expenses_amount: "",
  entertainment_expenses_amount: "",
  tap_other_expenses_amount: "",
};

function useClaimIntCard() {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [currency, setCurrency] = useState("INR");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        tour_type: "DOMESTIC",
      }),
    ]).then((promises) => {
      const empDetail = promises[0]?.value?.data;
      const listData = promises[1]?.value?.data;
      setEmployeeDetails(empDetail);
      setEmployees(listData?.CLAIM_TAP);
    });
  }, []);

  const changeAmount = useCallback(
    (text, fieldName) => {
      const t = { ...totalAmount };
      t[fieldName] = text;
      setTotalAmount(t);
    },
    [totalAmount, setTotalAmount]
  );

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

  // const ImprestAmount =
  //   (() => {
  //     if (form?.travel_planner_id?.id) {
  //       if (form?.travel_planner_id?.imprest?.status === "ACCOUNTS_APPROVED") {
  //         return form?.travel_planner_id?.imprest?.amount;
  //       }
  //     }
  //     return 0;
  //   },
  //   [form?.travel_planner_id]);

  const imprestAmount = useMemo(() => {
    if (form?.travel_planner_id?.myImprest?.status === "ACCOUNTS_APPROVED") {
      return form?.travel_planner_id?.myImprest?.amount;
    }
    return 0;
  }, [form]);

  const getTotalValue = useMemo(() => {
    return Object.values(totalAmount).reduce((acc, value) => {
      if (value !== "") {
        acc += parseFloat(value);
      }
      return acc;
    }, 0);
  }, [totalAmount, setTotalAmount]);

  const getOfficeAmount = useMemo(() => {
    const value =
      Number(officeAmount ? officeAmount : 0) +
      Number(officeAmount2 ? officeAmount2 : 0) +
      Number(officeAmount3 ? officeAmount3 : 0) +
      Number(officeAmount4 ? officeAmount4 : 0);
    return value ? value : 0;
  }, [officeAmount, officeAmount2, officeAmount3, officeAmount4]);

  console.log("getOfficeAmount", getOfficeAmount);
  const getRefundAmount = useMemo(() => {
    return imprestAmount
      ? Number(getTotalValue) - Number(getOfficeAmount) - Number(imprestAmount)
      : Number(getTotalValue) - Number(getOfficeAmount);
  }, [form?.travel_planner_id, getTotalValue, imprestAmount, getOfficeAmount]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsLoading(true);
      setIsSubmitting(true);
      const fd = new FormData();
      fd.append("travel_planner_id", form?.travel_planner_id?.id);
      fd.append("currency", currency);
      Object.keys(totalAmount).forEach((key) => {
        fd.append(key, totalAmount[key]);
      });
      // const sum = Object.values(totalAmount).reduce((acc, value) => {
      //   if (value !== "") {
      //     acc += parseFloat(value);
      //   }
      //   return acc;
      // }, 0);

      fd.append("total_amount", getRefundAmount);
      const lodgeData = lodgeRef.current.getData();

      let modifiedArr = lodgeData?.map((item) => {
        return {
          ...item,
          shared_with: item?.shared_with?.map((person) => person?.id),
        };
      });
      if (tourType === "FOREIGN") {
        delete modifiedArr.city_cluster;
        delete modifiedArr.city_name;
      } else {
        delete modifiedArr.country;
        delete modifiedArr.country_name;
      }
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
      let req = serviceUpdateIntClaim;
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
    getOfficeAmount,
    getRefundAmount,
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
    getOfficeAmount,
    setOfficeAmount2,
    getRefundAmount,
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
    officeAmount3,
    setOfficeAmount3,
    setOfficeAmount4,
    getOfficeAmount,
    officeAmount2,
    getRefundAmount,
    imprestAmount,
  };
}

export default useClaimIntCard;
