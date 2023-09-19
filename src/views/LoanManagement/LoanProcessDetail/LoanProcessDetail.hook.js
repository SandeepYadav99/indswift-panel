import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import {
  serviceGetLoanBudgetOutstanding,
  serviceGetLoanBudgetPosition,
  serviceGetLoanEligiblityCalculator,
  serviceGetLoanListDetails,
  serviceGetLoanSchedule,
  serviceUpdateLoanFormDetails,
} from "../../../services/LoanList.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useRef } from "react";
import { useMemo } from "react";
import debounce from "lodash.debounce";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import { isDate, isInvalidDateFormat } from "../../../libs/RegexUtils";

const initialForm = {
  total_applied_loan: "",
  loan_start_date: "",
  loan_end_date: "",
  interest: "",
  employee_el: "",
  employee_el_amount: "",
  gratuity_amount: "",
  total_recoverable_amount: "",
  posible_recovery_loan: "",
  comment: "",
  previous_year_loan_comment: "",
  exceptional_approval: "",
  table_amount: "",
};
const eligibility_fields = [
  "total_applied_loan",
  "employee_el",
  "employee_el_amount",
  "gratuity_amount",
  "total_recoverable_amount",
  "posible_recovery_loan",
  "exceptional_approval",
  "table_amount",
];

const recoveryField = ["loan_start_date", "loan_end_date", "interest"];

function useLoanProcessDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [loanDetail, setLoanDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [experience, setExperience] = useState();
  const [errorData, setErrorData] = useState({});
  const [tabledata, setTableData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [afterAmount, setAfterAmount] = useState("");
  const [form, setForm] = useState({ ...initialForm });
  const [info, setInfo] = useState({});
  const travelRef = useRef(null);
  const { id } = useParams();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    if (employeeDetail?.loan_id) {
      let req = serviceGetLoanEligiblityCalculator({
        id: employeeDetail?.loan_id,
      });
      req.then((data) => {
        const loan_data = data?.data;
        if (loan_data?.length > 0) {
          setLoanDetail(loan_data[0]);
        }
      });
    }
  }, [employeeDetail?.loan_id]);

  const loanBudgetOutstanding = (val) => {
    if (employeeDetail?.loan_id) {
      let req = serviceGetLoanBudgetOutstanding({
        loan_id: employeeDetail?.loan_id,
        financial_year: `${currentYear}-${currentYear + 1}`,
        total_applied_amount: val?.total_applied_loan,
        current_outstanding: Number(val.table_amount),
      });
      req.then((data) => {
        const td = data?.data;
        if (td?.length > 0) {
          setAfterAmount(td[3]?.after);
        }
        setTableData(data?.data);
      });
    }
  };
  const loanBudgetOutstandingDebounce = useMemo(() => {
    return debounce((e) => {
      loanBudgetOutstanding(e);
    }, 1000);
  }, [employeeDetail?.loan_id]);

  useEffect(() => {
    if (loanDetail?.applied_amount) {
      let t = { ...form };
      if(!form?.total_applied_loan){
        t["total_applied_loan"] = loanDetail?.applied_amount
        ? loanDetail?.applied_amount
        : 0;
      }
      loanBudgetOutstanding(t);
      setForm(t);
    }
  }, [loanDetail?.applied_amount]);

  useEffect(() => {
    Promise.allSettled([serviceGetLoanListDetails({ id: id })]).then(
      (promises) => {
        const empDetail = promises[0]?.value?.data?.details;
        setEmployeeDetail(empDetail);
        setExperience(empDetail?.loan?.employee?.experience?.current);
        const serializedData = sessionStorage.getItem("formValues");
        if (serializedData) {
          const parsedData = JSON.parse(serializedData);
          sessionStorage.removeItem("formValues");
            checkForLoanSchedule(parsedData,empDetail?.loan_id);
          setForm({ ...form, ...parsedData });
        }
        const historyData = sessionStorage.getItem("history");
        if (historyData) {
          const parsedhistory = JSON.parse(historyData);
          travelRef.current.setData(parsedhistory);
          sessionStorage.removeItem("history");
        }
      }
    );
  }, [id]);
  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);

  const checkForLoanSchedule = (data,loanId) => {
    if (data?.loan_start_date && data?.loan_end_date && data?.interest) {
      let req = serviceGetLoanSchedule({
        id: employeeDetail?.loan_id && employeeDetail?.loan_id !== null ? employeeDetail?.loan_id : loanId,
        total_applied_loan: data?.total_applied_loan
          ? data?.total_applied_loan
          : 0,
        loan_start_date: data?.loan_start_date,
        loan_end_date: data?.loan_end_date,
        interest: Number(data?.interest),
      });
      req.then((res) => {
        setInfo(res.data);
      });
    }
  };

  const checkLoanScheduleDebounce = useMemo(() => {
    return debounce((e) => {
      checkForLoanSchedule(e);
    }, 1000);
  }, [employeeDetail?.loan_id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "loan_start_date",
      "loan_end_date",
      "interest",
      "table_amount",
    ];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (!isDate(form?.loan_start_date)) {
      if (isInvalidDateFormat(form?.loan_start_date)) {
        errors["loan_start_date"] = true;
      }
    }
    if (!isDate(form?.loan_end_date)) {
      if (isInvalidDateFormat(form?.loan_end_date)) {
        errors["loan_end_date"] = true;
      }
    }
    if (form?.loan_start_date && form?.loan_end_date) {
      const joinDate = new Date(form?.loan_start_date);
      const expectedDate = new Date(form?.loan_end_date);
      joinDate.setHours(0, 0, 0, 0);
      expectedDate.setHours(0, 0, 0, 0);
      if (joinDate.getTime() > expectedDate.getTime()) {
        SnackbarUtils.error(
          "Loan End date should not be Less than Loan Start date"
        );
        errors["loan_end_date"] = true;
      }
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, setForm]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsLoading(true);
      setIsSubmitting(true);
      const TravelData = travelRef.current.getData();
      const eligibility_calculations = {};
      eligibility_fields.forEach((key) => {
        if (key in form) {
          eligibility_calculations[key] = form[key];
        }
      });
      const proposal_recovery_plan = {
        net_recovery_amount: info?.total?.totalRepaybleAmmount,
        tenure_month: info?.totalTenureMounth,
        emi: info?.loanEmi?.length > 0 ? info?.loanEmi?.[0]?.EMI : "",
      };
      recoveryField.forEach((key) => {
        if (key in form) {
          proposal_recovery_plan[key] = form[key];
        }
      });
      const data = {
        previous_loan_history: TravelData,
        eligibility_calculations,
        proposal_recovery_plan,
        loan_history_comment: form?.previous_year_loan_comment,
      };
      console.log("data", data);
      serviceUpdateLoanFormDetails({
        review_id: id,
        comment: form?.comment,
        loan_update: { ...data },
      }).then((res) => {
        if (!res.error) {
          sessionStorage.removeItem("formValues");
          sessionStorage.removeItem("history");
          historyUtils.push(`${RouteName.ADMIN_LOAN_LIST}`);
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
    employeeDetail?.loan_id,
    info,
    setInfo,
  ]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isTravelValid = travelRef.current.isValid();

    if (!isTravelValid || Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    submitToServer,
    employeeDetail?.loan_id,
    info,
    form,
    setInfo,
  ]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const viewRecoveryPage = useCallback(
    (data) => {
      historyUtils.push(RouteName.ADMIN_LOAN_RECOVERY, {
        id: employeeDetail?.loan_id,
        formValues: form,
      });
      const serializedData = JSON.stringify(form);
      const TravelData = JSON.stringify(travelRef.current.getData());
      sessionStorage.setItem("formValues", serializedData);
      sessionStorage.setItem("history", TravelData);
    },
    [employeeDetail, form]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      // LogUtils.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };
      if (
        [
          "employee_el",
          "employee_el_amount",
          "gratuity_amount",
          "total_recoverable_amount",
          "exceptional_approval",
        ].includes(fieldName)
      ) {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else if (fieldName === "interest") {
        if (text >= 0 && text <= 100) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      if (fieldName === "exceptional_approval") {
        t["total_applied_loan"] =
          Number(text) +
          Number(loanDetail?.applied_amount ? loanDetail?.applied_amount : 0);
          loanBudgetOutstandingDebounce(t)
      }
      if (fieldName === "table_amount") {
        t["table_amount"] = text;
        loanBudgetOutstandingDebounce(t);
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      if (
        ["loan_start_date", "loan_end_date", "interest"]?.includes(fieldName)
      ) {
        checkLoanScheduleDebounce(t);
      }
    },
    [removeError, form, setForm, loanDetail, employeeDetail?.loan_id]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );
  return {
    id,
    employeeDetail,
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    experience,
    loanDetail,
    viewRecoveryPage,
    approveDialog,
    toggleStatusDialog,
    info,
    tabledata,
    afterAmount,
    travelRef,
  };
}

export default useLoanProcessDetail;
