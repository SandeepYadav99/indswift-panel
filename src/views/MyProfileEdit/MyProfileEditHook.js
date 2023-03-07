import React, {useCallback, useEffect, useRef, useState} from "react";
import {isAadhar, isAlphaNumChars, isEmail, isSpace,} from "../../libs/RegexUtils";
import {serviceCheckEmployeeExists, serviceGetEmployeeEditInfo,} from "../../services/Employee.service";
import useDebounce from "../../hooks/DebounceHook";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import {serviceEditEmployeeVersion} from "../../services/EmployeeEdit.service";
import {useSelector} from "react-redux";

const initialForm = {
  name: "",
  emp_code: "",
  image: "",
  gender: "",
  dob: "",
  state: "",
  blood_group: "",
  personal_contact: "",
  personal_email: "",
  martial_status: "",
  dom: "",
  esi_no: 0,
  pan_no: "",
  aadhar_no: "",
  uan_no: 0,
  father_name: "",
  mother_name: "",
  spouse_name: "",
  spouse_gender: "",
  spouse_dob: "",
  permanent_address: "",
  current_address: "",
  is_address_same: false,
};

function useMyProfileEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ ...initialForm });
  const [editData, setEditData] = useState({});
  const [errorData, setErrorData] = useState({});
  const { user: { user_id: id } } = useSelector(state => state.auth);
  const changedFields = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ChildenRef = useRef(null);
  const codeDebouncer = useDebounce(form?.emp_code, 500);


  useEffect(() => {
   if (id) {
     Promise.allSettled([
       serviceGetEmployeeEditInfo({ emp_id: id }),
     ]).then((promises) => {
       const empData = promises[0]?.value?.data;
       setForm({
         ...initialForm,
         ...empData,
         image: "",
       });
       setEditData(empData);
       setIsLoading(false);
     });
   }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    const required = [
      "name",
      "gender",
      "dob",
      "state",
      "blood_group",
      "personal_contact",
      "martial_status",
      // "dom",
      "father_name",
      "mother_name",
      "permanent_address",
      "current_address",
      "uan_no",
      "pan_no",
      "aadhar_no",
    ];
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      } else if (["emp_code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    if (form?.personal_email && !isEmail(form?.personal_email)) {
      errors["personal_email"] = true;
    }
    if (form?.current_address.length < 0) {
      delete errors["current_address"];
    }
    if (form?.aadhar_no && !isAadhar(form?.aadhar_no)) {
      errors["aadhar_no"] = true;
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

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
      if (fieldName === "name" || fieldName === "address") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "emp_code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else if (fieldName === "is_address_same") {
        if (text) {
          t.current_address = t?.permanent_address;
          if (changedFields.current.indexOf('current_address') < 0) {
            changedFields.current = [...changedFields.current, 'current_address'];
          }
        }
        t[fieldName] = text;
        shouldRemoveError = false;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      if (changedFields.current.indexOf(fieldName) < 0) {
        changedFields.current = [...changedFields.current, fieldName];
      }
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm, form.current_address]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData, checkCodeValidation]
  );
  const checkCodeValidation = useCallback(() => {
    if (form?.emp_code) {
      serviceCheckEmployeeExists({
        code: form?.emp_code,
        id: id ? id : null,
      }).then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["emp_code"] = "Employee Code Exists";
            setErrorData(errors);
          } else {
            delete errors.emp_code;
            setErrorData(errors);
          }
        }
      });
    }
  }, [errorData, setErrorData, form.emp_code, id]);
  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      const changedData = [];
      changedFields.current.forEach((key) => {
        if (key != "image") {
          const newData = form?.[key];
          const oldData = editData?.[key];
          if (
            [
              "hod_id",
              "pms_reviewer_id",
              "job_role_id",
              "designation_id",
            ].indexOf(key) >= 0
          ) {
            changedData.push({
              is_json: false,
              key: key,
              db_value: newData?.id,
              new_value: newData?.id,
              old_value: oldData ? oldData?.id : null,
            });
          } else {
            changedData.push({
              is_json: false,
              key: key,
              db_value: newData,
              new_value: newData,
              old_value: oldData ? oldData : "",
            });
          }
        }
      });
      const { data: childrenData, isChanged: isChildrenDataChanged } =
        ChildenRef.current.getData();
      if (isChildrenDataChanged) {
        changedData.push({
          key: "children",
          is_json: true,
          db_value: "",
          new_value: JSON.stringify(childrenData),
          old_value: JSON.stringify(
            editData?.children ? editData?.children : []
          ),
        });
      }
      fd.append("emp_id", id);
      fd.append("data", JSON.stringify(changedData));
      if (form?.image) {
        fd.append("image", form?.image);
      }
      serviceEditEmployeeVersion(fd).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Raised!");
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, id, editData, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("=====>", form, errors);
    const isIncludesValid = ChildenRef.current.isValid();
    if (Object.keys(errors)?.length > 0 || !isIncludesValid) {
      setErrorData(errors);
      return true;
    }
    if (isIncludesValid) {
      const { isChanged } = ChildenRef.current.getData();
      if (changedFields.current.length === 0 && !isChanged) {
        SnackbarUtils.error("No Data Changed");
        return true;
      }
      submitToServer();
    }
  }, [
    checkFormValidation,
    setErrorData,
    ChildenRef.current,
    form,
    // includeRef.current
  ]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    ChildenRef,
    editData,
    isLoading,
  };
}

export default useMyProfileEdit;
