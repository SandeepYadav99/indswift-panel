import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { serviceApproveCLaim } from "../../../../../services/Claims.service";
import RouteName from "../../../../../routes/Route.name";
import historyUtils from "../../../../../libs/history.utils";
import { serviceApproveInterviewCLaim } from "../../../../../services/InterviewClaims.service";

const initialForm = {
  comment: "",
};
const useApproveDialogHook = ({
  isOpen,
  handleToggle,
  candidateId,
  isInterview,
}) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const { employeeData } = useSelector((state) => state.employee);
  const [errorData, setErrorData] = useState({});
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const EmpId = window.location.pathname?.includes("/cm/hr/details/")
    ? { employee_id: "63d9267d3d18b8ce6e9b700c" }
    : {};
  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setResData([]);
      setIsSubmitted(false);
      setIsVerified(false);
      setErrorData({});
    }
  }, [isOpen]);

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
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      setIsVerified(false);
    },
    [removeError, form, setForm, setIsVerified]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
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

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceApproveCLaim({
        review_id: candidateId,
        ...form,
        ...EmpId
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Approved");
          historyUtils.push(RouteName.CLAIMS_LIST);
          handleToggle();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const submitToServerInterview = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceApproveInterviewCLaim({
        review_id: candidateId,
        ...form,
        ...EmpId
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Approved");
          historyUtils.push(RouteName.CLAIMS_INTERVIEW);
          handleToggle();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    if (!isInterview) {
      submitToServer();
    } else {
      submitToServerInterview();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer]);

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
    errorData,
    isSubmitting,
    resData,
    isSubmitted,
    isVerified,
    showPasswordCurrent,
    setShowPasswordCurrent,
    setDeclaration,
    declaration,
  };
};

export default useApproveDialogHook;
