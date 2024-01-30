import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import historyUtils from "../../../../../libs/history.utils";
import {
  serviceCreateTaxForm,
  serviceGetEmployeeDetails,
  serviceUpdateFile,
} from "../../../../../services/ClaimsManagement.service";
import { useSelector } from "react-redux";

const initialForm = {
  fy_year: "",
  house_rent_total: "",
  leave_travel: "",
  leave_travel_evidence: "",
  deduction_borrowing_evidences: "",
  life_insurance: "",
  life_insurance_evidence: "",
  term_insurance: "",
  term_insurance_evidence: "",
  mutual_funds: "",
  mutual_funds_evidence: "",
  sukanya_samriddhi: "",
  sukanya_samriddhi_evidence: "",
  epf: "",
  epf_evidence: "",
  ppf: "",
  ppf_evidence: "",
  house_loan_principle: "",
  house_loan_principle_evidence: "",
  fd_five_year: "",
  fd_five_year_evidence: "",
  eighty_ccc: "",
  eighty_ccc_evidence: "",
  eighty_ccd: "",
  eighty_ccd_evidence: "",
  total_eighty_c: "",
  self_insurance: "",
  self_insurance_evidence: "",
  family_insurance: "",
  family_insurance_evidence: "",
  parents_insurance: "",
  parents_insurance_evidence: "",
  is_parents_senior_citizen: "",
  medical_expenditure: "",
  medical_expenditure_evidence: "",
  phc: "",
  phc_evidence: "",
  total_eighty_d: "",
  total_family_amount: "",
  employee_contribution: "",
  employee_contribution_evidence: "",
  education_loan: "",
  education_loan_evidence: "",
  donations: "",
  donations_evidence: "",
  disability: "",
  disability_evidence: "",
  total_other: "",
  total_under_deduction: "",
  is_drafted: "",
};

const useTaxCard = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [declaration, setDeclaration] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [claimInfo, setClaimInfo] = useState({});

  const { id } = useParams();
  const {
    user: { emp_code },
  } = useSelector((state) => state.auth);

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

  const deleteImage = (text, fieldName) => {
    setForm({ ...form, [fieldName]: [...text] });
  };

  console.log("form", form);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [""];

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
      console.log(">form", form);
      let req = serviceCreateTaxForm;
      // req(form).then((res) => {
      //   if (!res.error) {
      //     historyUtils.goBack();
      //   } else {
      //     SnackbarUtils.error(res?.message);
      //   }
      //   setIsLoading(false);
      //   setIsSubmitting(false);
      // });
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
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

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    isEdit,
    editData,
    declaration,
    setDeclaration,
    employeeDetails,
    claimInfo,
    getUrlfromFile,
    deleteImage,
  };
};

export default useTaxCard;
