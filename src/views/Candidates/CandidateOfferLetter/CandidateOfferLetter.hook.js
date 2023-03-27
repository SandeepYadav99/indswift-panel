import React, { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { isNum } from "../../../libs/RegexUtils";
import { serviceGetList } from "../../../services/Common.service";
import historyUtils from "../../../libs/history.utils";
import {
  serviceCreateCandidateOfferLetter,
  serviceGetCandidateDetails,
} from "../../../services/Candidate.service";
import LogUtils from "../../../libs/LogUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
const SALARY_KEYS = [
  "basic_salary",
  "hra",
  "education_allowance",
  "medical_allowance",
  "special_allowance",
  "earning_one",
  "pug",
  "helper",
  "food_coupons",
  "gift_coupons",
  "lta",
  "super_annuation",
  "nps",
  "vehicle_maintenance",
  "vehicle_emi",
  "fuel",
  "vpf",
  "earning_two",
  "gross",
  "earning_three_pli",
  "er_pf",
  "er_esi",
  "er_lwf",
  "earning_four",
  "gratuity",
  "insurance",
  "driver_incentive",
  "perf_bonus",
  "annual_bonus",
  "two_car_maintenance",
  "two_fuel",
  "earning_five",
  "monthly_ctc",
  "em_pf",
  "em_esi",
  "em_lwf",
  "total_deduction",
  "total_pf",
  "retention_allowance",
  "car_component",
  "incremental_gross_salary",
  "earning2_vpf",
  "deduction_vpf",
  "stability_incentive",
];

function CandidateOfferLetterHook({ location }) {
  const initialForm = {
    joining_date: "",
    reporting_location: "",
    expected_response_date: "",
    reporting_company: "",
    note: "",
    is_amrf: 'No',
    basic_salary: 0,
    hra: 0,
    education_allowance: 0,
    medical_allowance: 0,
    special_allowance: 0,
    earning_one: 0,
    pug: 0,
    helper: 0,
    food_coupons: 0,
    gift_coupons: 0,
    lta: 0,
    super_annuation: 0,
    nps: 0,
    vehicle_maintenance: 0,
    vehicle_emi: 0,
    fuel: 0,
    vpf: 0,
    earning_two: 0,
    gross: 0,
    earning_three_pli: 0,
    er_pf: 0,
    er_esi: 0,
    er_lwf: 0,
    earning_four: 0,
    gratuity: 0,
    insurance: 0,
    driver_incentive: 0,
    perf_bonus: 0,
    annual_bonus: 0,
    two_car_maintenance: 0,
    two_fuel: 0,
    earning_five: 0,
    monthly_ctc: 0,
    em_pf: 0,
    em_esi: 0,
    em_lwf: 0,
    total_deduction: 0,
    total_pf: 0,
    retention_allowance: 0,
    car_component: 0,
    incremental_gross_salary: 0,
    earning2_vpf: 0,
    deduction_vpf: 0,
    associate: 0,
    stability_incentive: 0,
    next_review_date: "",
    previous_review_date: "",
    is_address_same: false,
  };

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [candidateData, setCandidateData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (!candidateId) {
      historyUtils.goBack();
    } else {
      Promise.allSettled([
        serviceGetCandidateDetails({ id: candidateId }),
      ]).then((promises) => {
        const dataValues = promises[0]?.value?.data;
        setCandidateData(dataValues?.details);
      });
    }
  }, [candidateId]);

  const { candidateId, jobId } = useMemo(() => {
    return {
      candidateId: location?.state?.candidate_id,
      jobId: location?.state?.job_id,
    };
  }, [location]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "joining_date",
      "reporting_location",
      "reporting_company",
      "expected_response_date",
      ...SALARY_KEYS,
      ,
    ];
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });

    SALARY_KEYS.forEach((val) => {
      if (form?.[val] && form?.[val] < 0) {
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
      if (SALARY_KEYS.indexOf(fieldName) >= 0) {
        if (!text || isNum(text)) {
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

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceCreateCandidateOfferLetter({
        candidate_id: candidateId,
        job_id: jobId,
        ...form,
        location_id: form?.reporting_location?.id,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Offer Letter Created Successfully");
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [candidateId, jobId, form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    LogUtils.log("errors", errors);
    if (Object.keys(errors)?.length > 0) {
      setErrorData(errors);
      return true;
    }
    LogUtils.log("server", form);
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);
  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    candidateData,
    isSubmitting,
  };
}

export default CandidateOfferLetterHook;
