import { useCallback, useEffect, useState } from "react";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";
import { serviceEmployeeCreateReturnEmp } from "../../../../../services/EmployeeImprest.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const initialForm = {
  employee_id: "",
  currency: "",
  debit_amount: 0,
  voucher_no: "",
  date: "",
  description: "",
};
const useReturnEmpDialogHook = ({
  isOpen,
  handleToggle,
  candidateId,
  listData,
  emp_id,
}) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
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
  useEffect(() => {
    if (emp_id) {
      const empIndex = listData?.EMPLOYEES.findIndex(
        (val) => val.id === emp_id
      );
      if (empIndex >= 0) {
        const employeeValue = listData?.EMPLOYEES[empIndex];
        setForm({ ...form, employee_id: employeeValue });
      }
    }
  }, [emp_id, listData]);
  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "debit_amount") {
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

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "employee_id",
      "currency",
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
    if (form?.debit_amount == 0) {
      errors["debit_amount"] = true;
    }

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
      serviceEmployeeCreateReturnEmp({
        ...form,
        employee_id: form?.employee_id?.id,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Submitted SuccessFully");
          handleToggle();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle, candidateId]);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
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
    setDeclaration,
    declaration,
  };
};

export default useReturnEmpDialogHook;
