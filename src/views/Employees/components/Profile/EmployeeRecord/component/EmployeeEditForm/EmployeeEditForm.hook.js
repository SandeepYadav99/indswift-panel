import { useCallback, useEffect, useState } from "react";

import { serviceUpdateEmployeeRecord } from "../../../../../../../services/EmployeeRecords.services";
import SnackbarUtils from "../../../../../../../libs/SnackbarUtils";

const useEmployeeEditForm = ({ closeSidePanel, data }) => {
  const recordFields = {
    title: "",
    date_of_issue: "",
    document: "",
    letter_head_no: "",
    record_type: "",
    employee_id: "",
    letter_type: "",
    id: "",
  };

  const PmsFields = {
    title: "",
    date_of_issue: "",
    document: "",
    letter_head_no: "",
    record_type: "",
    employee_id: "",
    star_type: "",
    description: "",
    id: "",
  };

  const [form, setForm] = useState({ letter_type: "", star_type: "" });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Formtype, setFormType] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (data) {
      const editData = data;
      if (data?.star_type) {
        const pmsData = { document: "" };
        Object.keys({ ...editData }).forEach((key) => {
          if (key in PmsFields && key !== "document") {
            pmsData[key] = editData[key];
          }
        });
        setImg(data?.document);
        setFormType("STAR");
        setForm({ ...form, ...pmsData, record_type: "STAR" });
      } else {
        const recordData = { document: "" };
        Object.keys({ ...editData }).forEach((key) => {
          if (key in recordFields && key !== "document") {
            recordData[key] = editData[key];
          }
        });
        setImg(data?.document);
        setFormType("RECORD");
        setForm({ ...form, ...recordData, record_type: "RECORD" });
      }
    }
  }, [data]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["title", "date_of_issue"];
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
      let req = serviceUpdateEmployeeRecord;
      const fd = new FormData();
      if (form?.document) {
        fd?.append("document", form?.document);
      }
      if (form?.record_type) {
        fd.append("record_type", form?.record_type);
      }
      if (form?.employee_id) {
        fd.append("employee_id", form?.employee_id);
      }
      const updatedNewValues = {
        title: form?.title,
        date_of_issue: form?.date_of_issue,
        star_type: form?.star_type,
        letter_head_no: form?.letter_head_no,
        description: form?.description,
        letter_type: form?.letter_type,
      };

      fd.append("new_values", JSON.stringify(updatedNewValues));

      if (Formtype === "RECORD") {
        fd.append("letter_type", form?.letter_type);
      } else {
        fd.append("star_type", form?.star_type);
      }

      fd.append("employee_record_id", data?.id);

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
    isSubmitting,
    Formtype,
    img,
  };
};

export default useEmployeeEditForm;
