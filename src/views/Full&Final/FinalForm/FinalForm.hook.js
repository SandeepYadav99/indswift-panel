import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  isAadhar,
  isAccountNum,
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isEmail,
  IsIFSCCode,
  isNum,
  isSpace,
} from "../../../libs/RegexUtils";
import { useParams } from "react-router";
import { useMemo } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import debounce from "lodash.debounce";

import {
  serviceGetFinalFormDetails,
  serviceGetFormDebounceDetails,
  serviceSubmitFFForm,
} from "../../../services/FinalForm.service";

const SALARY_KEYS = [
  "pds",
  "dol",
  "notice_period",
  "served_for",
  "notice_leave_availed",
  "shortfall_remarks",
  "shortfall_notice_period",
  "shortfall_applicable",
  "shortfall_leaves_added",
  "notice_leave_permitted",
  "payroll_one_paid_days",
  "payroll_one_value",
  "payroll_two_paid_days",
  "payroll_two_value",
  "payroll_three_paid_days",
  "payroll_three_value",
  "statutory_bonus",
  "gratuity",
  "declared_pli",
  "un_declared_pli",
  "professional_upgradation",
  "helper_allowance",
  "food_coupon",
  "gift_coupon_bonus",
  "lta",
  "superannuation",
  "incentive",
  "car_maintenance",
  "fuel",
  "vpf",
  "el_balance",
  "el_balance_value",
  "el_currnet_service_year",
  "el_currnet_service_year_value",
  "fel",
  "fel_value",
  "rbl",
  "rbl_value",
  "nfh",
  "total_dues",
  "pf",
  "esi",
  "labour_welfare_fund",
  "mobile_device_recovery",
  "car_maintenance_recovery",
  "notice_period_recovery",
  "bgv",
  "relocation_recovery",
  "transportation_deduction",
  "safety_gadget_recovery",
  "it_asset_recovery",
  "canteen_recovery",
  "imprest_recovery",
  "petro_card_recovery",
  "smart_card_recovery",
  "loan_final_recovery",
  "adv_salary_recovery",
  "i_card_recovery",
  "other_recovery",
  "tds",
  "professional_tax",
  "car_status",
  "total_recovery",
  "un_declared_pli_uphold",
  "gratuity_uphold",
  "statutory_bonus_uphold",
  "el_balance_uphold",
  "el_currnet_service_year_uphold",
  "fel_uphold",
  "rbl_uphold",
  "superannuation_uphold",
  "total_uphold_dues",
  "net_payable",
];

const BOOLEAN_KEYS = [
  "is_notice_period_manual",
  "is_el_balance_manual",
  "is_el_currnet_service_year_manual",
  "is_rbl_manual",
  "is_notice_period_recovery_manual",
  "is_bgv_manual",
  "is_relocation_recovery_manual",
  "is_imprest_recovery_manual",
  "is_gratuity_uphold_manual",
  "is_served_for_manual",
];

function useFinalForm() {
  const initialForm = {
    pds: "",
    dol: "",
    is_notice_period_manual: "NO",
    served_for: "",
    notice_leave_availed: "",
    shortfall_remarks: "",
    shortfall_notice_period: "",
    shortfall_applicable: "",
    shortfall_leaves_added: "",
    notice_leave_permitted: "",
    salary_remark: "",
    payroll_one_month: "",
    payroll_one_paid_days: "",
    payroll_one_value: "",
    payroll_one_status: "",
    payroll_one_salary_slip: null,
    payroll_two_month: "",
    payroll_two_paid_days: "",
    payroll_two_value: "",
    payroll_two_status: "",
    payroll_two_salary_slip: null,
    payroll_three_month: "",
    payroll_three_paid_days: "",
    payroll_three_value: "",
    payroll_three_status: "",
    payroll_three_salary_slip: null,
    statutory_bonus: "",
    statutory_bonus_comment: "",
    gratuity: "",
    gratuity_comment: "",
    declared_pli: "",
    declared_pli_comment: "",
    un_declared_pli: "",
    un_declared_pli_comment: "",
    professional_upgradation: "",
    professional_upgradation_comment: "",
    helper_allowance: "",
    helper_allowance_comment: "",
    food_coupon: "",
    food_coupon_comment: "",
    gift_coupon_bonus: "",
    gift_coupon_bonus_comment: "",
    lta: "",
    lta_comment: "",
    superannuation: "",
    superannuation_comment: "",
    incentive: "",
    incentive_comment: "",
    car_maintenance: "",
    car_maintenance_comment: "",
    fuel: "",
    fuel_comment: "",
    vpf: "",
    vpf_comment: "",
    el_balance: "",
    el_balance_value: "",
    is_el_balance_manual: "NO",
    el_balance_comment: "",
    el_currnet_service_year: "",
    el_currnet_service_year_value: "",
    is_el_currnet_service_year_manual: "NO",
    el_currnet_service_year_comment: "",
    fel: "",
    fel_value: "",
    fel_comment: "",
    rbl: "",
    rbl_value: "",
    is_rbl_manual: "NO",
    rbl_comment: "",
    nfh: "",
    nfh_comment: "",
    total_dues: "",
    pf: "",
    pf_comment: "",
    esi: "",
    esi_comment: "",
    is_served_for_manual: "NO",
    labour_welfare_fund: "",
    labour_welfare_fund_comment: "",
    mobile_device_recovery: "",
    mobile_device_recovery_comment: "",
    car_maintenance_recovery: "",
    car_maintenance_recovery_comment: "",
    notice_period_recovery: "",
    is_notice_period_recovery_manual: "NO",
    notice_period_recovery_comment: "",
    bgv: "",
    is_bgv_manual: "NO",
    bgv_comment: "",
    relocation_recovery: "",
    is_relocation_recovery_manual: "NO",
    relocation_recovery_comment: "",
    transportation_deduction: "",
    transportation_deduction_comment: "",
    safety_gadget_recovery: "",
    safety_gadget_recovery_comment: "",
    it_asset_recovery: "",
    it_asset_recovery_comment: "",
    canteen_recovery: "",
    canteen_recovery_comment: "",
    imprest_recovery: "",
    is_imprest_recovery_manual: "NO",
    imprest_recovery_comment: "",
    petro_card_recovery: "",
    petro_card_recovery_comment: "",
    smart_card_recovery: "",
    smart_card_recovery_comment: "",
    loan_final_recovery: "",
    loan_final_recovery_comment: "",
    adv_salary_recovery: "",
    adv_salary_recovery_comment: "",
    i_card_recovery: "",
    i_card_recovery_comment: "",
    other_recovery: "",
    other_recovery_comment: "",
    tds: "",
    tds_comment: "",
    professional_tax: "",
    professional_tax_comment: "",
    car_status: "",
    car_status_comment: "",
    total_recovery: "",
    un_declared_pli_uphold: "",
    un_declared_pli_uphold_comment: "",
    gratuity_uphold: "",
    is_gratuity_uphold_manual: "NO",
    gratuity_uphold_comment: "",
    statutory_bonus_uphold: "",
    statutory_bonus_uphold_comment: "",
    el_balance_uphold: "",
    el_balance_uphold_comment: "",
    el_currnet_service_year_uphold: "",
    el_currnet_service_year_uphold_comment: "",
    fel_uphold: "",
    fel_uphold_comment: "",
    rbl_uphold: "",
    rbl_uphold_comment: "",
    superannuation_uphold: "",
    superannuation_uphold_comment: "",
    total_uphold_dues: "",
    net_payable: "",
  };

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [salaryInfo, setSalaryInfo] = useState([
    ...SALARY_KEYS,
    ...BOOLEAN_KEYS,
  ]);
  const [employeeDetail, setEmployeeDetail] = useState({});
  const ChildenRef = useRef(null);

  const checkSalaryInfoDebouncer = useMemo(() => {
    return debounce((e) => {
      checkForSalaryInfo(e);
    }, 1000);
  }, [employeeDetail]);
  const { id } = useParams();
  useEffect(() => {
    let req = serviceGetFinalFormDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "pds",
      "dol",
      "is_notice_period_manual",
      "served_for",
      "notice_leave_availed",
      "shortfall_remarks",
      "shortfall_notice_period",
      "notice_leave_permitted",
      "salary_remark",
      "payroll_one_month",
      "payroll_one_paid_days",
      "payroll_one_value",
      "payroll_one_status",
      "payroll_one_salary_slip",
      "payroll_two_month",
      "payroll_two_paid_days",
      "payroll_two_value",
      "payroll_two_status",
      "payroll_two_salary_slip",
      "payroll_three_month",
      "payroll_three_paid_days",
      "payroll_three_value",
      "payroll_three_status",
      "payroll_three_salary_slip",
      "statutory_bonus",
      "statutory_bonus_comment",
      "gratuity",
      "gratuity_comment",
      "declared_pli",
      "declared_pli_comment",
      "un_declared_pli",
      "un_declared_pli_comment",
      "professional_upgradation",
      "professional_upgradation_comment",
      "helper_allowance",
      "helper_allowance_comment",
      "food_coupon",
      "food_coupon_comment",
      "gift_coupon_bonus",
      "gift_coupon_bonus_comment",
      "lta",
      "lta_comment",
      "superannuation",
      "superannuation_comment",
      "incentive",
      "incentive_comment",
      "car_maintenance",
      "car_maintenance_comment",
      "fuel",
      "fuel_comment",
      "vpf",
      "vpf_comment",
      "el_balance",
      "el_balance_value",
      "is_el_balance_manual",
      "el_balance_comment",
      "el_currnet_service_year",
      "el_currnet_service_year_value",
      "is_el_currnet_service_year_manual",
      "el_currnet_service_year_comment",
      "fel",
      "fel_value",
      "fel_comment",
      "rbl",
      "rbl_value",
      "is_rbl_manual",
      "rbl_comment",
      "nfh",
      "nfh_comment",
      "total_dues",
      "pf",
      "pf_comment",
      "esi",
      "esi_comment",
      "labour_welfare_fund",
      "labour_welfare_fund_comment",
      "mobile_device_recovery",
      "mobile_device_recovery_comment",
      "car_maintenance_recovery",
      "car_maintenance_recovery_comment",
      "notice_period_recovery",
      "is_notice_period_recovery_manual",
      "notice_period_recovery_comment",
      "bgv",
      "is_bgv_manual",
      "bgv_comment",
      "relocation_recovery",
      "is_relocation_recovery_manual",
      "relocation_recovery_comment",
      "transportation_deduction",
      "transportation_deduction_comment",
      "safety_gadget_recovery",
      "safety_gadget_recovery_comment",
      "it_asset_recovery",
      "it_asset_recovery_comment",
      "canteen_recovery",
      "canteen_recovery_comment",
      "imprest_recovery",
      "is_imprest_recovery_manual",
      "imprest_recovery_comment",
      "petro_card_recovery",
      "petro_card_recovery_comment",
      "smart_card_recovery",
      "smart_card_recovery_comment",
      "loan_final_recovery",
      "loan_final_recovery_comment",
      "adv_salary_recovery",
      "adv_salary_recovery_comment",
      "i_card_recovery",
      "i_card_recovery_comment",
      "other_recovery",
      "other_recovery_comment",
      "tds",
      "tds_comment",
      "professional_tax",
      "professional_tax_comment",
      "car_status",
      "car_status_comment",
      "total_recovery",
      "un_declared_pli_uphold",
      "un_declared_pli_uphold_comment",
      "gratuity_uphold",
      "is_gratuity_uphold_manual",
      "gratuity_uphold_comment",
      "statutory_bonus_uphold",
      "statutory_bonus_uphold_comment",
      "el_balance_uphold",
      "el_balance_uphold_comment",
      "el_currnet_service_year_uphold",
      "el_currnet_service_year_uphold_comment",
      "fel_uphold",
      "fel_uphold_comment",
      "rbl_uphold",
      "rbl_uphold_comment",
      "superannuation_uphold",
      "superannuation_uphold_comment",
      "total_uphold_dues",
      "net_payable",
    ];
    required.push(...SALARY_KEYS);
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      } else if (["emp_code"].indexOf(val) < 0) {
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
  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );
  const checkForSalaryInfo = (data) => {
    let filteredForm = { employee_id: employeeDetail?.employee?.id };
    for (let key in data) {
      if (salaryInfo.includes(key)) {
        if (BOOLEAN_KEYS.includes(key)) {
          filteredForm[key] = data[key] === "YES";
        } else if (["pds", "dol"].includes(key)) {
          filteredForm[key] = data[key];
        } else {
          filteredForm[key] = data[key] ? parseInt(data[key]) : 0;
        }
      }
    }
    console.log("filteredForm", { filteredForm, data });
    let req = serviceGetFormDebounceDetails({
      ...filteredForm,
    });
    req.then((res) => {
      const salaryData = res.data;
      const booleanData = {};
      for (const key in salaryData) {
        if (salaryData.hasOwnProperty(key)) {
          let value = salaryData[key];
          if (BOOLEAN_KEYS.includes(key)) {
            value = value ? "YES" : "NO";
          }
          booleanData[key] = value;
        }
      }
      console.log("bool", booleanData);
      setForm({ ...form, ...data, ...booleanData });
    });
  };
  console.log("form", form);
  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };

      t[fieldName] = text;

      setForm(t);
      shouldRemoveError && removeError(fieldName);

      if ([...salaryInfo]?.includes(fieldName)) {
        checkSalaryInfoDebouncer(t);
      }
    },
    [removeError, form, setForm, checkSalaryInfoDebouncer]
  );
  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type], type);
      }
    },
    [changeTextData]
  );
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (
          [
            "payroll_one_salary_slip",
            "payroll_two_salary_slip",
            "payroll_three_salary_slip",
          ].indexOf(key) < 0 &&
          form[key]
        ) {
          LogUtils.log("key", key);
          if (BOOLEAN_KEYS.includes(key)) {
            fd.append(key, form[key] === "YES");
          } else {
            fd.append(key, form[key]);
          }
        }
      });
      fd.append("id", id);
      if (form?.payroll_one_salary_slip) {
        fd.append("payroll_one_salary_slip", form?.payroll_one_salary_slip);
      }
      if (form?.payroll_two_salary_slip) {
        fd.append("payroll_two_salary_slip", form?.payroll_two_salary_slip);
      }
      if (form?.payroll_three_salary_slip) {
        fd.append("payroll_three_salary_slip", form?.payroll_three_salary_slip);
      }
      const AttachData = ChildenRef.current.getData();
      AttachData.forEach((val) => {
        if (val?.attachment_documents) {
          fd.append("attachment_documents", val?.attachment_documents);
        }
      });
      fd.append("attachments", JSON.stringify(AttachData));
      serviceSubmitFFForm(fd).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, employeeDetail, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValid = ChildenRef.current.isValid();

    LogUtils.log("errors==>", { errors, form });
    if (Object.keys(errors)?.length > 0 || !isIncludesValid) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    form,
    submitToServer,
    employeeDetail,
    id,
  ]);
  return {
    employeeDetail,
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    submitToServer,
    ChildenRef,
  };
}

export default useFinalForm;
