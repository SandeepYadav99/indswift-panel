import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import historyUtils from "../../../../../libs/history.utils";
import {
  serviceGetEmployeeDetails,
  serviceUpdateFile,
  serviceUpdateMobileClaims,
} from "../../../../../services/ClaimsManagement.service";
import { useSelector } from "react-redux";

const initialForm = {
  bill_amount: "",
  bill_date: "",
  official_contact: "",
  document: null,
  payment_mode: "",
  deduction_borrowing_evidences: null,
  invoice_no: "",
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

  //   serviceUpdateFile
  const getUrlfromFile = (text, fieldName) => {
    console.log("text, fieldName",text, fieldName)
    const fd = new FormData();
    text.forEach((item)=>{
        fd.append("files",item)
    })
    let req = serviceUpdateFile(
      fd
    );
    req.then((res) => {
      const data = res?.data
      setForm({...form,[fieldName]:[...data]})
    });
  };

  const deleteImage = (text,fieldName)=>{
    setForm({...form,[fieldName]:[...text]})
  }
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
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (
          ["document", "deduction_borrowing_evidences"].indexOf(key) < 0 &&
          form[key]
        ) {
          fd.append(key, form[key]);
        }
      });
      if (form?.document) {
        fd.append("document", form?.document);
      }
      if (form?.deduction_borrowing_evidences) {
        fd.append(
          "deduction_borrowing_evidences",
          form?.deduction_borrowing_evidences
        );
      }
      let req = serviceUpdateMobileClaims;
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
    deleteImage
  };
};

export default useTaxCard;
