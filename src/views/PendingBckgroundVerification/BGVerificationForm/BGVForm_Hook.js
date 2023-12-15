import { useParams } from "react-router";
import { useCallback, useState } from "react";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";

import {  serviceEmployeeBGVUpdate } from "../../../services/PendingBGVerification.service";

const useBGVForm_Hook = ({}) => {
  const initialForm = {
    is_education_verification: false,
    is_first_employment_verification: false,
    is_secound_employment_verification: false,
    is_criminal_verification: false,
    cost: "",
    billing_to: "",
    remark: "",
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isInterviewStatus, setIsInterviewStatus] = useState(-1);
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isCostEdit, setIsCostEdit] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(0);

  const checkboxFields = [
    "is_education_verification",
    "is_first_employment_verification",
    "is_secound_employment_verification",
    "is_criminal_verification",
  ];

  const calculateCost = (form) => {
    const selectedCheckboxes = checkboxFields.filter((field) => form[field]);
    let cost = 0;

    switch (selectedCheckboxes.length) {
      case 1:
        cost = 1;
        break;
      case 2:
        cost = 500;
        break;
      case 3:
        cost = 900;
        break;
      case 4:
        cost = 1400;
        break;
      default:
        cost = 0;
    }
    return cost;
  };

  const toggleCostEdit = useCallback(() => {
    setIsCostEdit(!isCostEdit);
  }, [isCostEdit]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["cost", "billing_to"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    if (selectedCheckboxes < 2) {
      SnackbarUtils.error("Please select at least two verification options");
      return;
    }
    setIsSubmitting(true);

    const updatedData = {
      // employee_id: id,
      id: id,
      is_education_verification: form?.is_education_verification,
      is_first_employment_verification: form?.is_first_employment_verification,
      is_secound_employment_verification:
        form?.is_secound_employment_verification,
      is_criminal_verification: form?.is_criminal_verification,
      cost: form?.cost,
      initial_cost:form?.cost,
      billing_to: form?.billing_to,
      remark: form?.remark,
    };

    try {
      let req = serviceEmployeeBGVUpdate(updatedData);
      let res = await req;

      // const req = empId ? serviceUpdatePolicyList(formData) : serviceCreatePolicyList(formData);
      // const res = await req;

      if (!res.error) {
        historyUtils.goBack();
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      await submitToServer();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (value, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };

      if (fieldName === "billing_to") {
        t[fieldName] = value;
      } else if (fieldName === "cost") {
        t.cost = value;
      } else if (fieldName === "remark") {
        t.remark = value;
      } else {
        t[fieldName] = value;
        t.cost = calculateCost(t);
        const selectedCount = checkboxFields.filter((field) => t[field]).length;
        setSelectedCheckboxes(selectedCount);
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [calculateCost, form, setForm, removeError]
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
    isLoading,
    data,
    id,
    isInterviewStatus,
    form,
    errorData,
    changeTextData,
    errorData,
    handleSubmit,
    isCostEdit,
    toggleCostEdit,
  };
};

export default useBGVForm_Hook;
