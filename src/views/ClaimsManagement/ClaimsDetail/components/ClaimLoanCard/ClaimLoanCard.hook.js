import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import historyUtils from "../../../../../libs/history.utils";
import {
  serviceCheckLoanAmount,
  serviceGetEmployeeDetails,
  serviceUpdateEmployeeLoan,
} from "../../../../../services/ClaimsManagement.service";
import { useSelector } from "react-redux";
import { serviceGetList } from "../../../../../services/Common.service";
import useDebounce from "../../../../../hooks/DebounceHook";

const initialForm = {
  loan_type: "",
  amount: "",
  description: "",
  g1: "",
  g2: "",
  // g3: "",
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
  const [currentExp, setCurrentExp] = useState([]);
  const travelRef = useRef(null);
  const [isChecked, setIsChecked] = React.useState(false);
  const codeDebouncer = useDebounce(form?.amount, 300);
  const typeDebounce = useDebounce(form?.loan_type, 500);

  const { id } = useParams();
  const {
    user: { emp_code ,user_id},
  } = useSelector((state) => state.auth);

  useEffect(() => {
    Promise.allSettled([
      serviceGetEmployeeDetails({ code: emp_code }),
      serviceGetList(["LOAN_GUARANTEES"],{'employee_id':user_id}),
    ]).then((promises) => {
      const empDetail = promises[0]?.value?.data;
      const listData = promises[1]?.value?.data;
      setEmployeeDetails(empDetail);
      setEmployees(listData?.LOAN_GUARANTEES);
      setCurrentExp(empDetail?.experience?.current);
    });
  }, []);

  useEffect(() => {
    if (typeDebounce) {
      checkImprestAmount();
    }
  }, [typeDebounce]);

  useEffect(() => {
    if (codeDebouncer) {
      checkImprestAmount();
    }
  }, [codeDebouncer]);

  const checkImprestAmount = useCallback(() => {
    if (form?.loan_type && form?.amount) {
      const errors = JSON.parse(JSON.stringify(errorData));
      serviceCheckLoanAmount({
        loan_type: form?.loan_type,
        amount: form?.amount,
      }).then((res) => {
        if (res.error) {
          errors["amount"] = true;
          setErrorData(errors);
          SnackbarUtils.error(res.message);
        } else {
          delete errors.amount;
          setErrorData(errors);
        }
      });
    }
  }, [errorData, setErrorData, form?.loan_type, form?.amount]);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["loan_type", "amount", "description", "g1", "g2"];
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
      setIsLoading(true);
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["loan_type", "amount", "description"].includes(key)) {
          fd.append(key, form[key]);
        }
      });
      fd.append('employee_id',user_id)
      const idsArray = [];
      for (const key in form) {
        if (key?.startsWith("g")) {
          idsArray.push(form[key].id);
        }
      }
      fd.append("guarantees", JSON.stringify(idsArray));
      const ExpensesData = travelRef.current.getData();
      let label = [];
      ExpensesData.forEach((val) => {
        if (val?.documents) {
          fd.append("documents", val?.documents);
        }
        if (val?.documents_label) {
          label.push(val.documents_label);
        }
      });
      fd.append("documents_label", JSON.stringify(label));
      let req = serviceUpdateEmployeeLoan;
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
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValid = travelRef.current.isValid();
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
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "amount") {
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

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  const filteredEmployees = useMemo(() => {
    const idArray = Object.values(form)
      .map((item) => item?.id)
      .filter((id) => id !== undefined && id !== null);
    return employees?.filter((val) => !idArray.includes(val?.id));
  }, [form?.g1, form?.g2, employees]);
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
    travelRef,
    isChecked,
    setIsChecked,
    employees,
    currentExp,
    filteredEmployees,
  };
};

export default useClaimLoanCard;
