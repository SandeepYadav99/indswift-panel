import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import historyUtils from "../../../../../../libs/history.utils";
import { useSelector } from "react-redux";
import { serviceCreateEmployeeRecord } from "../../../../../../services/EmployeeRecords.services";
import SnackbarUtils from "../../../../../../libs/SnackbarUtils";

const useEmployeeView = ({ closeSidePanel, Formtype }) => {
  const { employeeData } = useSelector((state) => state.employee);
  const initialForm = {
    title: "",
    date_of_issue: "",
    document: "",
    letter_head_no: "",
    star_type: "",
    record_type: Formtype,
    employee_id: employeeData?.id,
    letter_type: "",
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["title", "date_of_issue", "document"];
    required.forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      }
    });
    if (Formtype === "RECORD") {
      if (!form?.letter_type) {
        errors["letter_type"] = true;
      }
      if (!form?.letter_head_no) {
        errors["letter_head_no"] = true;
      }
    }
    if (Formtype === "STAR") {
      if (!form?.star_type) {
        errors["star_type"] = true;
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
      let req = serviceCreateEmployeeRecord;
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (key !== "star_type" && key !== "letter_type") {
          fd.append(key, form[key]);
        }
      });
      if (Formtype === "RECORD") {
        fd.append("letter_type", form?.letter_type);
      } else {
        fd.append("star_type", form?.star_type);
      }
      req(fd).then((res) => {
        if (!res.error) {
          closeSidePanel();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errors = checkFormValidation();
      console.log("errors", errors);
      if (Object.keys(errors).length > 0) {
        setErrorData(errors);
        return true;
      }
      submitToServer();
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

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
  };
};

export default useEmployeeView;
