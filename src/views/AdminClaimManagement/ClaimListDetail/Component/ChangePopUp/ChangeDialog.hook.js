import { useCallback, useEffect, useState } from "react";
import { serviceChangeEmployeeStatus } from "../../../../../services/Employee.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { useSelector } from "react-redux";
import { serviceApproveCLaim } from "../../../../../services/Claims.service";
import RouteName from "../../../../../routes/Route.name";
import historyUtils from "../../../../../libs/history.utils";
import { serviceApproveInterviewCLaim } from "../../../../../services/InterviewClaims.service";

const initialForm = {
  approved_amount: "",
  comment: "",
};
const useChangeDialogHook = ({
  isOpen,
  handleToggle,
  candidateId,
  entitledAmount,
  claimAmount,
  isInterview
}) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const { employeeData } = useSelector((state) => state.employee);
  const [errorData, setErrorData] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [approved, setApproved] = useState();
  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setResData([]);
      setIsSubmitted(false);
      setIsVerified(false);
      setErrorData({});
    }
  }, [isOpen]);
  useEffect(() => {
    if (form?.approved_amount) {
      setApproved(parseFloat(form?.approved_amount));
    }
  }, [form?.approved_amount]);
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
      if (fieldName === "approved_amount") {
        if (text >= 0 && text <= claimAmount) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      setIsVerified(false);
    },
    [removeError, form, setForm, setIsVerified]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["approved_amount"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (form?.approved_amount > entitledAmount) {
        SnackbarUtils.error(
          "Approved amount cannnot be greater than Entitled Amount"
        );
        errors["approved_amount"] = true;
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
  }, [form, errorData, entitledAmount]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceApproveCLaim({
        review_id: candidateId,
        comment: form?.comment,
        approved_amount: approved,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Placed Successfully");
          handleToggle();
          historyUtils.push(RouteName.CLAIMS_LIST);
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
        comment: form?.comment,
        approved_amount: approved,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Placed Successfully");
          handleToggle();
          historyUtils.push(RouteName.CLAIMS_INTERVIEW);
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===>", { form, errors });
    // LogUtils.log("errors", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    if(!isInterview){
      submitToServer();
    }else{
      submitToServerInterview()
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

    declaration,
    setDeclaration,
  };
};

export default useChangeDialogHook;
