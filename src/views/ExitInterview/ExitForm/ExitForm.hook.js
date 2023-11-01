import { useCallback, useEffect, useState } from "react";
import { serviceApproveCLaim } from "../../../services/Claims.service";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";
import { serviceApproveInterviewCLaim } from "../../../services/InterviewClaims.service";

const initialForm = {
  get_closer_to_your_home_town: "",
  discharge_family_responsibility: "",
  get_more_basic_salary: "",
  get_more_perks_and_employee_benefits: "",
  have_more_job_responsibilities_and_exposure: "",
  have_better_carreer_prospects: "",
  get_more_challenging_innovative_dynamic_working_env: "",
  due_to_my_supervisor_work_relations_with_colleagues: "",
  due_to_some_health_problem: "",
  approved_amount: "",
  comment: "",
};
const useExitForm = () => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);

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
    },
    [removeError, form, setForm]
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

  console.log("form", form);
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      // setIsSubmitting(true);
      // serviceApproveCLaim({
      //   review_id: candidateId,
      //   comment: form?.comment,
      //   approved_amount: approved,
      //   ...EmpId,
      // }).then((res) => {
      //   if (!res.error) {
      //     SnackbarUtils.success("Request Placed Successfully");
      //     historyUtils.push(RouteName.CLAIMS_LIST);
      //   } else {
      //     SnackbarUtils.error(res?.message);
      //   }
      //   setIsSubmitting(false);
      // });
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===>", { form, errors });
    // LogUtils.log("errors", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }

    submitToServer();
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
    declaration,
    setDeclaration,
  };
};

export default useExitForm;
