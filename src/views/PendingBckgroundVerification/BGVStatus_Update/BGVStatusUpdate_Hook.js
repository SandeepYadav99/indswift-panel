import { useParams } from "react-router";
import React, { useCallback, useEffect, useState } from "react";
import { serviceJobOpeningsDetails } from "../../../services/JobOpenings.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import {
  serviceEmployeeBGVDetail,
  serviceEmployeeBGVUpdate,
} from "../../../services/PendingBGVerification.service";

const initialForm = {
  is_education_verification: false,
  is_first_employment_verification: false,
  is_secound_employment_verification: false,
  is_criminal_verification: false,
  bgv_result: "",
  cost: 0,
  billing_to: "",
  choose_action: "",
  action_remark: "",
  remark: "",
  status: "SENT_FOR_VERIFICATION",
  id: "",
  is_education_verification_status: "",
  is_first_employment_verification_status: "",
  is_secound_employment_verification_status: "",
  is_criminal_verification_status: "",
  payment_complete: "2023-09-08",
  //
};

const useCandidateUpdate_Hook = ({}) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isInterviewStatus, setIsInterviewStatus] = useState(-1);
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    serviceEmployeeBGVDetail({ id: id }).then((res) => {
      if (!res.error) {
        console.log(res);
        const data = res?.data;
        console.log(data);
        setForm({
          ...form,
          name: data?.employeeObj?.name,
          is_education_verification: data?.is_education_verification,
          is_first_employment_verification:
            data?.is_first_employment_verification,
          is_secound_employment_verification:
            data?.is_secound_employment_verification,
          is_criminal_verification: data?.is_criminal_verification,
          cost: data?.cost,
          billing_to: data?.billing_to,
          remark: data?.remark,
          verificatioMonth: data?.verificatioMonth,
          id: data?.id,
          bgv_status:data?.bgv_status
        });
      } else {
        SnackbarUtils.error(res.message);
      }
      setIsLoading(false);
    });
  }, [id]);

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
  console.log(form);
  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const updatedData = {
      employee_id: id,
      is_education_verification: form?.is_education_verification,
      is_first_employment_verification: form?.is_first_employment_verification,
      is_secound_employment_verification:
        form?.is_secound_employment_verification,
      is_criminal_verification: form?.is_criminal_verification,
      bgv_result: form?.bgv_result,
      cost: form?.cost,
      billing_to: form?.billing_to,
      choose_action: form?.choose_action,
      action_remark: form?.action_remark,
      remark: form?.remark,
      status: form?.status,
      id: form?.id, // id
      is_education_verification_status: form?.is_education_verification_status,
      is_first_employment_verification_status:
        form?.is_first_employment_verification,
      is_secound_employment_verification_status:
        form?.is_secound_employment_verification,
      payment_complete: "",
    };

    try {
      const req = serviceEmployeeBGVUpdate(updatedData);
      const res = await req;

      if (!res.error) {
        historyUtils.goBack()
        // window.location.reload();
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting]); // EmpID

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
        // t.cost = calculateCost(t);
        // const selectedCount = checkboxFields.filter((field) => t[field]).length;
        // setSelectedCheckboxes(selectedCount);
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [form, setForm, removeError] // calculateCost
  );

  const handleViewEditDetails = useCallback((data) => {
    historyUtils.push(RouteName.JOB_OPENINGS_UPDATE + data.id);
  }, []);

  return {
    isLoading,
    data,
    id,
    isInterviewStatus,
    handleViewEditDetails,
    changeTextData,
    form,
    handleSubmit,
  };
};

export default useCandidateUpdate_Hook;
