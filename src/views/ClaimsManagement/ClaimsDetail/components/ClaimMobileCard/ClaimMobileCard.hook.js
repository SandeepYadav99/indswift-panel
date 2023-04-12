import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import LogUtils from "../../../../../libs/LogUtils";
import {
  serviceCandidateEditData,
  serviceCreateCandidate,
} from "../../../../../services/Candidate.service";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import historyUtils from "../../../../../libs/history.utils";
import { serviceGetEmployeeDetails, serviceUpdateMobileClaims } from "../../../../../services/ClaimsManagement.service";
import { isNum } from "../../../../../libs/RegexUtils";
import { useSelector } from "react-redux";

const initialForm = {
  bill_amount: "",
  bill_date: "",
  official_contact: "",
  document: null,
};

const useClaimMobileCard = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [declaration,setDeclaration]=useState(false)
  const [employeeDetails,setEmployeeDetails] = useState({})
  const { id } = useParams();
  const {
    user: { emp_code },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (emp_code) {
      let dataValues = serviceGetEmployeeDetails({ code: emp_code });
      dataValues
        .then((data) => {
          console.log("detail>", data);
          setEmployeeDetails(data?.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  // useEffect(() => {
  //   if (id) {
  //     serviceCandidateEditData({ id: id }).then((res) => {
  //       if (!res.error) {
  //         const data = res?.data?.details;
  //         setEditData(data);
  //         const form = {
  //           ...initialForm,
  //         };
  //         Object.keys(initialForm).forEach((key) => {
  //           if (key !== "document" && data?.[key]) {
  //             form[key] = data?.[key];
  //           }
  //         });
  //         setForm({
  //           ...initialForm,
  //           ...form,
  //         });
  //       }
  //     });
  //   }
  // }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["bill_amount", "bill_date", "official_contact", "document"];

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
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["document"].indexOf(key) < 0 && form[key]) {
          fd.append(key, form[key]);
        }
      });
      if (form?.document) {
        fd.append("document", form?.document);
      }
      let req = serviceUpdateMobileClaims;
      req(fd).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
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
      // LogUtils.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "marrige_of") {
        t[fieldName] = text.target.value;
      } 
      else if (fieldName === "official_contact") {
        if (isNum(text) && text.toString().length <= 10) {
          t[fieldName] = text;
        }
      }
      else {
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
    isEdit,
    handleDelete,
    handleReset,
    editData,
    declaration,
    setDeclaration,
    employeeDetails
  };
};

export default useClaimMobileCard;
