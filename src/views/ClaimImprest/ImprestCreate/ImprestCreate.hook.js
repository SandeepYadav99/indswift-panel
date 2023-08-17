import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import { serviceGetEmployeeDetails } from "../../../services/ClaimsManagement.service";
import { useSelector } from "react-redux";
import { serviceGetList } from "../../../services/Common.service";
import {
  serviceCreateImprest,
  serviceGetAmpountImprest,
  serviceGetDropdownDetail,
} from "../../../services/Imprest.service";

const initialForm = {
  imprest_type: "",
  tour_type: "",
  purpose: "",
  currency: "",
  amount: 0,
  sanctionable_amount: 0,
  is_salary_adjustment_agreed: false,
  comment:""
};

const useImprestCreate = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [editData, setEditData] = useState(null);
  const [declaration, setDeclaration] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [isChecked, setIsChecked] = React.useState(false);
  const [amountDetail, setAmountDetail] = useState({});
  const [listData, setListData] = useState();
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const { id } = useParams();
  const {
    user: { emp_code, user_id },
  } = useSelector((state) => state.auth);
  useEffect(() => {
    Promise.allSettled([serviceGetEmployeeDetails({ code: emp_code })]).then(
      (promises) => {
        const empDetail = promises[0]?.value?.data;
        setEmployeeDetails(empDetail);
      }
    );
  }, []);

  useEffect(() => {
    serviceGetDropdownDetail().then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (form?.amount && amountDetail && form?.currency) {
      const value =
        form?.amount -
        (amountDetail[form?.currency]?.balance
          ? amountDetail[form?.currency]?.balance
          : 0);
      setForm({ ...form, sanctionable_amount: value });
    }
  }, [form?.amount, amountDetail, form?.currency]);

  useEffect(() => {
    if (user_id) {
      serviceGetAmpountImprest({ employee_id: user_id }).then((res) => {
        if (!res.error) {
          setAmountDetail(res.data);
        }
      });
    }
  }, [user_id]);
  useEffect(()=>{
    if(form?.tour_type?.tour_type){
      if(form?.tour_type?.tour_type === 'DOMESTIC'){
        setForm({ ...form, currency: "INR" });
      }
    }
  },[form?.tour_type?.tour_type])
  useEffect(() => {
    if (form?.imprest_type === "OTHER") {
      setForm({ ...form, currency: "INR" });
    }
  }, [form?.imprest_type]);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["imprest_type", "purpose", "currency", "amount"];
    if (form?.imprest_type == "TRAVEL") {
      required.push("tour_type");
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    if(!listData?.length && form?.imprest_type == "TRAVEL"){
      SnackbarUtils.error("No travel plan found to raise imprest request")
    }
    if (!form?.imprest_type) {
      errors["imprest_type"] = true;
      SnackbarUtils.error("Please Select the Imprest Type");
    }
    if (form?.imprest_type === "OTHER") {
      if (form?.amount > 10000) {
        errors["amount"] = true;
        SnackbarUtils.error("Amount cannot be greater than 10000");
      } else if (form?.amount < 10000) {
        delete errors["amount"];
      }
    }
    if (form?.sanctionable_amount) {
      if (form?.sanctionable_amount < 0) {
        errors["sanctionable_amount"] = true;
      } else {
        delete errors["sanctionable_amount"];
      }
    }
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
      let data = { ...form };
      if (form?.imprest_type === "OTHER") {
        delete data.tour_type;
      } else {
        data.travel_planner_id = data.tour_type.id;
        data.tour_type = data.tour_type.tour_type;
      }
      let req = serviceCreateImprest;
      req({ ...data }).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsLoading(false);
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, setIsChecked, isChecked]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("---->", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    submitToServer,
    setIsChecked,
    isChecked,
    id,
  ]);

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
      if(fieldName === 'amount'){
        if(text >= 0 ){
          t[fieldName] = text;
        }
      }else{
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
    isChecked,
    handleCheckboxChange,
    employees,
    listData,
    amountDetail,
  };
};

export default useImprestCreate;
