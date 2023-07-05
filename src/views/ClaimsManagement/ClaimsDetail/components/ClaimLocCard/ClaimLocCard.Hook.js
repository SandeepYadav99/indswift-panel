import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import historyUtils from "../../../../../libs/history.utils";
import {
  serviceGetEmployeeDetails,
  serviceUpdateLocClaims,
} from "../../../../../services/ClaimsManagement.service";
import { useSelector } from "react-redux";
import { serviceGetClaimDetail } from "../../../../../services/Claims.service";
import nullImg from "../../../../../assets/img/null.png";
import { dataURLtoFile } from "../../../../../helper/helper";
import { serviceGetList } from "../../../../../services/Common.service";

const initialForm = {
  relocation_type: "",
  relocation_date: "",
};

const useClaimLocCard = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [editData, setEditData] = useState(null);
  const [declaration, setDeclaration] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [amount, setAmount] = useState(0);
  const [claimInfo, setClaimInfo] = useState({});
  const travelRef = useRef(null);
  const coRef = useRef(null);

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
      setClaimInfo({ ...claimDetail?.relocation_claim });
      setEmployees(listData?.EMPLOYEES);
    });
  }, []);
  const getAmount = useCallback(
    (val) => {
      setAmount(val);
    },
    [setAmount]
  );
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["relocation_date", "relocation_type"];

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.relocation_type?.length === 0) {
      errors["relocation_type"] = true;
      SnackbarUtils.error("Please Select the Type");
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  useEffect(()=>{
    if(employeeDetails.doj && form?.relocation_type === 'NEW_JOINEE'){
      setForm({...form,relocation_date : employeeDetails.doj})
    }
  },[form.relocation_type])

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsLoading(true);
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        fd.append(key, form[key]);
      });
      const ExpensesData = travelRef.current.getData();
      ExpensesData.forEach((val) => {
        if (val?.relocation_documents) {
          fd.append("relocation_documents", val?.relocation_documents);
        }
        if(val.relocation_payment_proof){
          fd.append("relocation_payment_proof",val?.relocation_payment_proof)
        }else {
          const file = dataURLtoFile(nullImg, "null.png");
          fd.append("travel_payment_proof", file);
        }
      });
      fd.append("bill_amount", amount);
      fd.append("relocation_expense_details", JSON.stringify(ExpensesData));
      console.log("serverhit");
      let req = serviceUpdateLocClaims;
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
  }, [form, isSubmitting, setIsSubmitting, id, amount, setAmount]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValid = travelRef.current.isValid();
    if (!isIncludesValid || Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, submitToServer, amount, setAmount]);

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
    travelRef,
    coRef,
    employees,
    getAmount,
  };
};

export default useClaimLocCard;
