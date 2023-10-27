import { useParams } from "react-router";
import React, { useCallback, useEffect, useState } from "react";
import { serviceJobOpeningsDetails } from "../../../services/JobOpenings.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

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
  // id: "653694d7feb8e04554c49ba5",
  is_education_verification_status: "",
  is_first_employment_verification_status: "",
  is_secound_employment_verification_status: "",
  is_criminal_verification_status: "",
  payment_complete: "2023-09-08",
};

const useCandidateUpdate_Hook = ({}) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isInterviewStatus, setIsInterviewStatus] = useState(-1);
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // useEffect(() => {
  //     setIsLoading(true);
  //     serviceJobOpeningsDetails({id: id}).then((res) => {
  //         if (!res.error) {
  //             setData(res.data.details);
  //         } else {
  //             SnackbarUtils.error(res.message);
  //         }
  //         setIsLoading(false);
  //     });
  // }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "effective_date",
      "chapter_id",
      // "document",
      // "status",
    ];

    // if (!empId) {
    //   required.push("document");
    // }
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
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key !== "document") {
          formData.append(
            key,
            key === "status" ? (form[key] ? "ACTIVE" : "INACTIVE") : form[key]
          );
        }
      });
      if (form.document) {
        formData.append("document", form?.document);
      }
      //   if (empId) {
      //     formData.append("id", empId);
      //   }

      //   const req = empId ? serviceUpdatePolicyList(formData) : serviceCreatePolicyList(formData);
      //   const res = await req;
      const res = "";
      if (!res.error) {
        window.location.reload();
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting]);// EmpID



  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      await submitToServer();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer]);


  const handleViewEditDetails = useCallback((data) => {
    historyUtils.push(RouteName.JOB_OPENINGS_UPDATE + data.id);
  }, []);


  return {
    isLoading,
    data,
    id,
    isInterviewStatus,
    handleViewEditDetails,
  };
};

export default useCandidateUpdate_Hook;
