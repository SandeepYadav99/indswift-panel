import { useCallback, useEffect, useState } from "react";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";
import { serviceEmployeeCreateReconciliation } from "../../../../../services/EmployeeImprest.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { isDate } from "../../../../../libs/RegexUtils";

const initialForm = {
  employee_id: "",
  currency:"",
  credit_amount: 0,
  debit_amount: 0,
  voucher_no: "",
  date: "",
  description: "",

};
const useAccountDialogHook = ({
  isOpen,
  handleToggle,
  candidateId,
  listData,
  emp_id
}) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration,setDeclaration]=useState(false)

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
      if(fieldName === 'debit_amount' || fieldName === "credit_amount"){
        if(text >= 0){
          t[fieldName] = text;
        }
      }else{
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
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

  useEffect(() => {
    if (!isOpen) {
      if (emp_id) {
        const empIndex = listData?.EMPLOYEES.findIndex(
          (val) => val.id === emp_id
        );
        if (empIndex >= 0) {
          const employeeValue = listData?.EMPLOYEES[empIndex];
          setForm({ ...initialForm, employee_id: employeeValue });
        }
      } else {
        setForm({ ...initialForm });
      }
    }
  }, [isOpen, emp_id, listData]);
  
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
    if (form?.debit_amount === 0) {
      delete errors["debit_amount"]
    }
    if (form?.credit_amount == 0) {
      errors["credit_amount"] = true;
    }
    if(!form?.voucher_no?.trim()){
      errors["voucher_no"] = true;
    }
    if (!isDate(form?.date)) {
      errors["date"] = true;
    }
    if(!form?.description?.trim()){
      errors["description"] = true;
    }
    if (form?.date) {
      const date = new Date(form?.date);
      const todayDate = new Date();
      date.setHours(0, 0, 0, 0);
      todayDate.setHours(0, 0, 0, 0);
      if (date.getTime() > todayDate.getTime()) {
        errors["date"] = true;
      }
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
      serviceEmployeeCreateReconciliation({
          ...form,
          employee_id:form?.employee_id?.id
      }).then(res => {
          if (!res.error) {
              SnackbarUtils.success('Submitted SuccessFully')
              handleToggle();
          } else {
              SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
      })
  }
  }, [form, isSubmitting, setIsSubmitting, handleToggle, candidateId]);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer()
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
    declaration
  };
};

export default useAccountDialogHook;
