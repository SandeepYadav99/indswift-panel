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
import { isDateInFiscalYear } from "../../../../../helper/helper";

const initialForm = {
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

const useTaxCard = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [declaration, setDeclaration] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const rentRef = useRef(null);
  const childRef = useRef(null);
  const { id } = useParams();
  const {
    user: { emp_code, user_id },
  } = useSelector((state) => state.auth);
  const today = new Date();
  const isTodayInFiscalYear = isDateInFiscalYear(today);

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
    let req = serviceGetTaxDetail({
      employee_id: user_id,
      fy_year: "2023-2024",
    });
    req.then((data) => {
      const res = data?.data?.details;
      const fd = {};
      fd.id = res?.id;
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
      if (res?.house_rent?.length > 0) {
        rentRef?.current?.setData(res?.house_rent);
      }
      if (res?.child_fees?.length > 0) {
        childRef?.current?.setData(res?.child_fees);
      }
      setForm({ ...form, ...fd });
    });
  }, [user_id]);

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

  console.log("form", form);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [];

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
    [form, isSubmitting, setIsSubmitting, id]
  );

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log(">>>>",errors)
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
      if (fieldName === "bill_amount") {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else if (fieldName === "interest_paid") {
        if (text >= 0 && text <= 200000) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      if (fieldName === "fy_rent_paid") {
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
  };
};

export default useTaxCard;
