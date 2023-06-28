import { useCallback, useEffect, useState } from "react";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";

const initialForm = {
  employee_id: "",
  currency:"",
  credit_amount: "",
  debit_amount: "",
  voucher_no: "",
  date: "",
  description: "",

};
const useAccountDialogHook = ({
  isOpen,
  handleToggle,
  candidateId,
  listData,
}) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    let required = [
      "employee_id",
      "currency",
      "credit_amount",
      "debit_amount",
      "voucher_no",
      "date",
      "description",
    ];
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
      // setIsSubmitting(true);
      // serviceChangeEmployeePassword({
      //     emp_id: employeeData?.id,
      //     ...form
      // }).then(res => {
      //     if (!res.error) {
      //         SnackbarUtils.success('Password Changed Successfully');
      //         handleToggle();
      //     } else {
      //         SnackbarUtils.error(res?.message);
      //     }
      //     setIsSubmitting(false);
      // })
  }
  }, [form, isSubmitting, setIsSubmitting, handleToggle, candidateId]);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer()
    // historyUtils.push(
    //   `${RouteName.EMPLOYEE_CREATE}`,
    //   {
    //     isTrainee: true,
    //     traineeId: form?.employee_id?.id,
    //   }
    // );
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
  };
};

export default useAccountDialogHook;
