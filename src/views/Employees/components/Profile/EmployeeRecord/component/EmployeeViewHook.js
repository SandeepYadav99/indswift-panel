import {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {serviceCreateEmployeeRecord} from "../../../../../../services/EmployeeRecords.services";
import SnackbarUtils from "../../../../../../libs/SnackbarUtils";

const useEmployeeView = ({ closeSidePanel, Formtype, employee_record_id }) => {
  const { employeeData } = useSelector((state) => state.employee);

  const initialForm = {
    document: "",
    record_type: Formtype,
    employee_id: employeeData?.id,
    new_values: {
      title: "",
      date_of_issue: "",
      star_type: "",
      letter_head_no: "",
      description: "",
      letter_type: "",
    },
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
      if (!form?.new_values?.letter_type) {
        errors["letter_type"] = true;
      }

      if (!form?.new_values?.letter_head_no) {
        errors["letter_head_no"] = true;
      }
    }

    if (Formtype === "STAR") {
      if (!form?.new_values?.star_type) {
        errors["star_type"] = true;
      }
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  }, [form, errorData, Formtype]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      let req = serviceCreateEmployeeRecord;
      const fd = new FormData();

      fd.append("document", form?.document || "");
      fd.append("record_type", form?.record_type || "");
      fd.append("employee_id", form?.employee_id || "");

      if (Formtype === "RECORD") {
        const updatedNewValues = {
          title: form?.new_values?.title,
          date_of_issue: form?.new_values?.date_of_issue,
          letter_head_no: form?.new_values?.letter_head_no,
          letter_type: form?.new_values?.letter_type,
        };
        fd.append("new_values", JSON.stringify(updatedNewValues));
      } else {
        const updatedNewValues = {
          title: form?.new_values?.title,
          date_of_issue: form?.new_values?.date_of_issue,
          star_type: form?.new_values?.star_type,
          letter_head_no: form?.new_values?.letter_head_no,
          description: form?.new_values?.description,
        };
        fd.append("new_values", JSON.stringify(updatedNewValues));
      }

      req(fd).then((res) => {
        if (!res.error) {
          closeSidePanel();
          window.location.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, Formtype, closeSidePanel]);

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
    [checkFormValidation, setErrorData, submitToServer]
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
      console.log(text, fieldName);
      const t = { ...form };

      t.new_values[fieldName] = text;
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

    [changeTextData, form]
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

export default useEmployeeView;
