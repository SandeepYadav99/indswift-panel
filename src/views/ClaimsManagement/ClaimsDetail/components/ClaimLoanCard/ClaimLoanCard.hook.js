import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import historyUtils from "../../../../../libs/history.utils";
import {
  serviceGetEmployeeDetails,
  serviceUpdateTravelClaims,
} from "../../../../../services/ClaimsManagement.service";
import { useSelector } from "react-redux";
import { serviceGetClaimDetail } from "../../../../../services/Claims.service";
import nullImg from "../../../../../assets/img/null.png";
import { dataURLtoFile } from "../../../../../helper/helper";
import { serviceGetList } from "../../../../../services/Common.service";

const initialForm = {
  bill_amount: "",
  bill_date: "",
  od_ss_2: null,
  rem_month: "",
  od_ss: null,
};

const useClaimLoanCard = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [editData, setEditData] = useState(null);
  const [declaration, setDeclaration] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [claimInfo, setClaimInfo] = useState({});
  const [travelAmount, setTravelAmount] = useState(null);
  const [otherAmount, setOtherAmount] = useState(null);
  const travelRef = useRef(null);
  const otherRef = useRef(null);
  const coRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const { id } = useParams();
  const {
    user: { emp_code },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    Promise.allSettled([
      serviceGetEmployeeDetails({ code: emp_code }),
      serviceGetClaimDetail(),
      serviceGetList(["EMPLOYEES"]),
    ]).then((promises) => {
      const empDetail = promises[0]?.value?.data;
      const claimDetail = promises[1]?.value?.data;
      const listData = promises[2]?.value?.data;
      setEmployeeDetails(empDetail);
      setClaimInfo({ ...claimDetail?.local_travel_claim });
      setEmployees(listData?.EMPLOYEES);
    });
  }, []);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["rem_month", "od_ss"];

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

  const getTravelAmount = useCallback(
    (val) => {
      setTravelAmount(val);
    },
    [setTravelAmount]
  );

  const getotherAmount = useCallback(
    (val) => {
      setOtherAmount(val);
    },
    [setOtherAmount]
  );

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsLoading(true);
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["od_ss_2", "od_ss"].indexOf(key) < 0 && form[key]) {
          fd.append(key, form[key]);
        }
      });
      if (form?.od_ss_2) {
        fd.append("od_ss_2", form?.od_ss_2);
      }
      if (form?.od_ss) {
        fd.append("od_ss", form?.od_ss);
      }

      fd.append("travel_details_amount", travelAmount);
      fd.append("other_expenses_amount", otherAmount);
      fd.append("bill_amount", travelAmount + otherAmount);

      if (isChecked) {
        const CoData = coRef.current.getData();
        const passanger = CoData?.map((item) => item?.co_passengers?.id);
        fd.append("co_passengers", JSON.stringify(passanger));
      }
      const ExpensesData = travelRef.current.getData();
      ExpensesData.forEach((val) => {
        if (val?.travel_payment_proof) {
          fd.append("travel_payment_proof", val?.travel_payment_proof);
        } else {
          const file = dataURLtoFile(nullImg, "null.png");
          fd.append("travel_payment_proof", file);
        }
      });
      fd.append("travel_details", JSON.stringify(ExpensesData));

      const otherExpensesData = otherRef.current.getData();
      otherExpensesData.forEach((val) => {
        if (val?.slip) {
          fd.append("slip", val?.slip);
        } else {
          const file = dataURLtoFile(nullImg, "null.png");
          fd.append("slip", file);
        }
      });
      fd.append("other_expenses", JSON.stringify(otherExpensesData));
      let req = serviceUpdateTravelClaims;
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
  }, [form, isSubmitting, setIsSubmitting, id, travelAmount, otherAmount,setIsChecked,isChecked]);

  const getMonthsInRange = useCallback(() => {
    const today = new Date();
    const fortyFiveDaysAgo = new Date(
      today.getTime() - 45 * 24 * 60 * 60 * 1000
    );
    const startDate = new Date(
      fortyFiveDaysAgo.getFullYear(),
      fortyFiveDaysAgo.getMonth(),
      1
    );
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const monthsInRange = [];

    while (startDate <= endDate) {
      const monthName = startDate.toLocaleString("default", { month: "long" });
      monthsInRange.push(monthName);
      startDate.setMonth(startDate.getMonth() + 1);
    }

    return monthsInRange;
  }, []);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValid = travelRef.current.isValid();
    const isOtherValid = otherRef.current.isValid();
    const isCoValid = isChecked ? coRef.current.isValid() : true;
    if (
      !isIncludesValid ||
      !isOtherValid ||
      !isCoValid ||
      Object.keys(errors).length > 0
    ) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, submitToServer, setIsChecked,isChecked]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const calculateMonthDates = useCallback(
    (month) => {
      const todayDate = new Date();
      const monthDate = new Date(`${todayDate.getFullYear()}/${month}/01`);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() - 45);
      if (monthDate.getMonth() === todayDate.getMonth()) {
        setStartDate(monthDate);
        setEndDate(todayDate);
      } else {
        if (minDate.getMonth() !== monthDate.getMonth()) {
          minDate.setMonth(monthDate.getMonth(), 1);
        }
        setStartDate(minDate);
        monthDate.setMonth(monthDate.getMonth() + 1, 0);
        setEndDate(monthDate);
      }
    },
    [setStartDate, setEndDate]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      // LogUtils.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      if (fieldName === "rem_month") {
        calculateMonthDates(text);
      }
    },
    [removeError, form, setForm, calculateMonthDates]
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
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    handleDelete,
    handleReset,
    editData,
    declaration,
    setDeclaration,
    employeeDetails,
    claimInfo,
    getMonthsInRange,
    travelRef,
    otherRef,
    coRef,
    getTravelAmount,
    getotherAmount,
    startDate,
    endDate,
    isChecked,
    handleCheckboxChange,
    employees,
  };
};

export default useClaimLoanCard;
