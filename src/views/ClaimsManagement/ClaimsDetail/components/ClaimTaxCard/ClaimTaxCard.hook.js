import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import historyUtils from "../../../../../libs/history.utils";
import {
  serviceCreateTaxForm,
  serviceGetEmployeeDetails,
  serviceGetTaxDetail,
  serviceGetTotalTaxForm,
  serviceUpdateFile,
} from "../../../../../services/ClaimsManagement.service";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { calculateFinancialYear, isDateInFiscalYear } from "../../../../../helper/helper";

const initialForm = {
  hra_months: "",
  hra_allowance_fifty_pct: "",
  hra_allowance_forty_pct: "",
  hra_allowance_rent_paid: "",
  hra_received: "",
  fy_rent_paid: "",
  hra_permitted: "",
  employee_id: "",
  is_taxable: false,
  fy_year: "",
  lender_name: "",
  lender_address: "",
  interest_paid: "",
  lender_address: "",
  lender_pan: "",
  financial_institutions: "",
  employer: "",
  others: "",
  house_rent_total: "",
  leave_travel: "",
  leave_travel_evidence: null,
  deduction_borrowing_evidences: null,
  life_insurance: "",
  life_insurance_evidence: null,
  term_insurance: "",
  term_insurance_evidence: null,
  mutual_funds: "",
  mutual_funds_evidence: null,
  sukanya_samriddhi: "",
  sukanya_samriddhi_evidence: null,
  stamp_duty:"",
  stamp_duty_evidence:null,
  epf: "",
  epf_evidence: null,
  ppf: "",
  ppf_evidence: null,
  house_loan_principle: "",
  house_loan_principle_evidence: null,
  fd_five_year: "",
  fd_five_year_evidence: null,
  eighty_ccc: "",
  eighty_ccc_evidence: null,
  eighty_ccd: "",
  eighty_ccd_evidence: null,
  total_eighty_c: "",
  family_insurance: "",
  family_insurance_evidence: null,
  parents_insurance: "",
  parents_insurance_evidence: null,
  medical_expenditure: "",
  medical_expenditure_evidence: null,
  phc: "",
  phc_evidence: null,
  total_eighty_d: "",
  total_family_amount: "",
  employee_contribution: "",
  employee_contribution_evidence: null,
  education_loan: "",
  education_loan_evidence: null,
  donations: "",
  donations_evidence: null,
  disability: "",
  disability_evidence: null,
  total_other: "",
  total_under_deduction: "",
  is_family_senior_citizen: "NO",
  family_phc: "",
  family_phc_evidence: null,
  family_medical_expenditure: "",
  family_medical_expenditure_evidence: null,
  is_parents_details: false,
  is_parents_senior_citizen: "NO",
  parents_phc: "",
  parents_phc_evidence: null,
  parents_medical_expenditure: "",
  parents_medical_expenditure_evidence: null,
};
const sectionCkeys = [
  "employee_contribution",
  "education_loan",
  "donations",
  "disability",
];
const sectionAkeys = [
  "life_insurance",
  "term_insurance",
  "mutual_funds",
  "sukanya_samriddhi",
  "epf",
  "ppf",
  "house_loan_principle",
  "fd_five_year",
  "eighty_ccc",
  "eighty_ccd",
  "child_total",
];
const personalKey = [
  "family_insurance",
  "family_phc",
  "family_medical_expenditure",
];
const ParentKey = [
  "parents_insurance",
  "parents_phc",
  "parents_medical_expenditure",
];

const useTaxCard = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [declaration, setDeclaration] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const rentRef = useRef(null);
  const childRef = useRef(null);
  const {
    user: { emp_code, user_id },
  } = useSelector((state) => state.auth);
  
  const today = new Date();
  const isTodayInFiscalYear = isDateInFiscalYear(today);
  // const financialYear = calculateFinancialYear(today)
  const financialYear = useMemo(() => calculateFinancialYear(today), [today, calculateFinancialYear]);
  console.log("financialYear",financialYear)
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
    if (!form?.is_parents_details) {
      setForm({
        ...form,
        parents_insurance: "",
        parents_phc: "",
        parents_medical_expenditure: "",
        parents_insurance_evidence: null,
        parents_phc_evidence: null,
        parents_medical_expenditure_evidence: null,
        total_family_amount: "",
      });
    }
    // if (form?.is_family_senior_citizen === "NO") {
    //   setForm({
    //     ...form,
    //     family_medical_expenditure: "",
    //     family_medical_expenditure_evidence: null,
    //   });
    // }
    // if (form?.is_parents_senior_citizen === "NO") {
    //   setForm({
    //     ...form,
    //     parents_medical_expenditure: "",
    //     parents_medical_expenditure_evidence: null,
    //   });
    // }
  }, [
    form?.is_parents_details,
    // form?.is_family_senior_citizen,
    // form?.is_parents_senior_citizen,
  ]);

  useEffect(() => {
    let req = serviceGetTaxDetail({
      employee_id: user_id,
      fy_year: financialYear,
    });
    req.then((data) => {
      const res = data?.data?.details;
      const fd = {};
      Object.keys({ ...res }).forEach((key) => {
        if (key in initialForm) {
          if (
            ["is_parents_senior_citizen", "is_family_senior_citizen"].includes(
              key
            )
          ) {
            fd[key] = res[key] ? "YES" : "NO";
          } else {
            fd[key] = res[key];
          }
        }
      });
      fd.id = res?.id ? res?.id : "";
      if (res?.house_rent?.length > 0) {
        rentRef?.current?.setData(res?.house_rent);
      }
      if (res?.child_fees?.length > 0) {
        childRef?.current?.setData(res?.child_fees);
      }
      let getTotal = serviceGetTotalTaxForm({
        employee_id: user_id,
        fy_rent_paid: fd?.fy_rent_paid ? fd?.fy_rent_paid : 0,
      })
      getTotal.then((data)=>{
        const total = data?.data?.details
        setTimeout(() => {
          setForm({ ...form, ...fd,...total });
        }, 500);
      })
    });
  }, [user_id,financialYear]);

  const getUrlfromFile = (text, fieldName) => {
    console.log("text, fieldName", text, fieldName);
    const fd = new FormData();
    text.forEach((item) => {
      fd.append("files", item);
    });
    let req = serviceUpdateFile(fd);
    req.then((res) => {
      const data = res?.data;
      setForm({ ...form, [fieldName]: [...data] });
    });
  };

  const getAllowenceByRent = (text) => {
    let req = serviceGetTotalTaxForm({
      employee_id: user_id,
      fy_rent_paid: text?.fy_rent_paid,
    });
    req.then((res) => {
      const data = res?.data?.details;
      console.log("Form");
      setForm({ ...form, ...text, ...data });
    });
  };
  const deleteImage = (text, fieldName) => {
    setForm({ ...form, [fieldName]: [...text] });
  };

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["fy_year"];

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.interest_paid && Number(form?.interest_paid) > 100000) {
      if (!form?.lender_pan) {
        errors["lender_pan"] = true;
      }
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsLoading(true);
        setIsSubmitting(true);
        const rentData = rentRef.current.getData();
        const childData = childRef.current.getData();
        const data = {
          ...form,
          house_rent: rentData,
          child_fees: childData,
          is_parents_senior_citizen: form?.is_parents_senior_citizen === "YES",
          is_family_senior_citizen: form?.is_family_senior_citizen === "YES",
        };
        if (status) {
          data.is_drafted = true;
        } else {
          data.is_drafted = false;
        }

        console.log(">form", { form, data });
        let req = serviceCreateTaxForm;
        req(data).then((res) => {
          if (!res.error) {
            historyUtils.goBack();
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsLoading(false);
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting]
  );

  const handleDraft = useCallback(
    (status) => {
      if (!form?.fy_year) {
        SnackbarUtils.error("Please Select the Finacial Year");
        return true;
      }
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form]
  );
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log(">>>>", errors);
    const isRentValid = rentRef.current.isValid();
    const isChildValid = childRef.current.isValid();
    if (Object.keys(errors).length > 0 || !isRentValid || !isChildValid) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const checkSalaryInfoDebouncer = useMemo(() => {
    return debounce((e) => {
      getAllowenceByRent(e);
    }, 1000);
  }, []);

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (
        [...sectionCkeys, ...sectionAkeys, ...personalKey]?.includes(fieldName)
      ) {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else if (fieldName === "interest_paid") {
        if (text >= 0 && text <= 200000) {
          t[fieldName] = text;
        }
      } else if (fieldName === "is_family_senior_citizen") {
        if (text === "NO") {
          t["family_medical_expenditure"] = "";
          t["family_medical_expenditure_evidence"] = null;
          t[fieldName] = text;
        } else {
          t[fieldName] = text;
        }
      } else if (fieldName === "is_parents_senior_citizen") {
        if (text === "NO") {
          t["parents_medical_expenditure"] = "";
          t["parents_medical_expenditure_evidence"] = null;
          t[fieldName] = text;
        } else {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      if (sectionCkeys?.includes(fieldName)) {
        const sumOfSectionCKeys = sectionCkeys.reduce((sum, key) => {
          const value = t[key];
          if (value !== undefined && value !== "") {
            sum += parseFloat(value);
          }
          return sum;
        }, 0);
        t["total_other"] = sumOfSectionCKeys;
      } else if (sectionAkeys?.includes(fieldName)) {
        const sumOfSectionAKeys = sectionAkeys.reduce((sum, key) => {
          const value = t[key];
          if (value !== undefined && value !== "") {
            sum += parseFloat(value);
          }
          return sum;
        }, 0);
        t["total_eighty_c"] = sumOfSectionAKeys;
      } else if (
        personalKey?.includes(fieldName) ||
        fieldName === "is_family_senior_citizen"
      ) {
        const personalKeyValues = personalKey.reduce((sum, key) => {
          const value = t[key];
          if (value !== undefined && value !== "") {
            sum += parseFloat(value);
          }
          return sum;
        }, 0);
        t["total_eighty_d"] = personalKeyValues;
      } else if (
        ParentKey?.includes(fieldName) ||
        fieldName === "is_parents_senior_citizen"
      ) {
        const ParentKeyValues = ParentKey.reduce((sum, key) => {
          const value = t[key];
          if (value !== undefined && value !== "") {
            sum += parseFloat(value);
          }
          return sum;
        }, 0);
        t["total_family_amount"] = ParentKeyValues;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      if (fieldName === "fy_rent_paid" || fieldName === "fy_year") {
        checkSalaryInfoDebouncer(t);
      }
    },
    [removeError, form, setForm, checkSalaryInfoDebouncer]
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
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    declaration,
    setDeclaration,
    employeeDetails,
    getUrlfromFile,
    deleteImage,
    rentRef,
    childRef,
    submitToServer,
    checkSalaryInfoDebouncer,
    isTodayInFiscalYear,
    handleDraft,
    financialYear
  };
};

export default useTaxCard;
