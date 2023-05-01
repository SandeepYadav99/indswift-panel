import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import historyUtils from "../../../../../libs/history.utils";
import {
  serviceGetEmployeeDetails,
  serviceUpdateTravelClaims,
} from "../../../../../services/ClaimsManagement.service";
import { isNum } from "../../../../../libs/RegexUtils";
import { useSelector } from "react-redux";
import { serviceGetClaimDetail } from "../../../../../services/Claims.service";
import LogUtils from "../../../../../libs/LogUtils";
import nullImg from "../../../../../assets/img/null.png";
import { dataURLtoFile } from "../../../../../helper/helper";

const initialForm = {
  bill_amount: "",
  bill_date: "",
  od_ss_2: null,
  rem_month: "",
  od_ss: null,
};

const useClaimTravelCard = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [declaration, setDeclaration] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [claimInfo, setClaimInfo] = useState({});
  const [travelAmount, setTravelAmount] = useState(null);
  const [otherAmount, setOtherAmount] = useState(null);
  const travelRef = useRef(null);
  const otherRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  const { id } = useParams();
  const {
    user: { emp_code },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (emp_code) {
      let dataValues = serviceGetEmployeeDetails({ code: emp_code });
      dataValues
        .then((data) => {
          setEmployeeDetails(data?.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    let dataValues = serviceGetClaimDetail();
    dataValues
      .then((data) => {
        setClaimInfo({ ...data?.data?.local_travel_claim });
      })
      .catch((err) => console.log(err));
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

      const ExpensesData = travelRef.current.getData();
      ExpensesData.forEach((val) => {
        if (val?.travel_payment_proof) {
          fd.append("travel_payment_proof", val?.travel_payment_proof);
          // fd.append("travel_payment_proof", new Blob([val?.travel_payment_proof], {type: val?.type}));
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
          // fd.append("slip", new Blob([val?.slip], {type: val?.type}));
        } else {
          fd.append("slip", null);
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
  }, [form, isSubmitting, setIsSubmitting, id, travelAmount, otherAmount]);

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
    if (!isIncludesValid || !isOtherValid || Object.keys(errors).length > 0) {
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
    isEdit,
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
    getTravelAmount,
    getotherAmount,
    startDate,
    endDate,
  };
};

export default useClaimTravelCard;
