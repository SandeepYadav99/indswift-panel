import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  serviceCreateEmployeeRecord,
  serviceUpdateEmployeeRecord,
} from "../../../../../../../services/EmployeeRecords.services";
import SnackbarUtils from "../../../../../../../libs/SnackbarUtils";
// import SnackbarUtils from "../../../../../../libs/SnackbarUtils";

const useEmployeeEditForm = ({ closeSidePanel, data }) => {
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
    description: "",
    id: "",
  };

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

  const [form, setForm] = useState({});
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

  console.log("data", { data, form });

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
      Object.keys(form).forEach((key) => {
        if (
          key !== "star_type" &&
          key !== "letter_type" &&
          key !== "description"
        ) {
          fd.append(key, form[key]);
        }
      });
      if (Formtype === "RECORD") {
        fd.append("letter_type", form?.letter_type);
      } else {
        fd.append("star_type", form?.star_type);
        fd.append("description", form?.description);
      }
      req(fd).then((res) => {
        if (!res.error) {
          //   closeSidePanel();
          //   window.location.reload();
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
