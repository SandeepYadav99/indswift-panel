import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  isAadhar,
  isAlphaNumChars,
  isEmail,
  isSpace,
} from "../../libs/RegexUtils";
import {
  serviceCheckEmployeeExists,
  serviceGetEmployeeEditInfo,
} from "../../services/Employee.service";
import useDebounce from "../../hooks/DebounceHook";
import SnackbarUtils from "../../libs/SnackbarUtils";
import { useSelector } from "react-redux";
import { serviceEditEmployeeVersion } from "../../services/EmployeeEdit.service";
import historyUtils from "../../libs/history.utils";

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
  const [nomineeDataIn, setNomineeDataIn] = useState([]);
  const {
    user: { user_id: id },
  } = useSelector((state) => state.auth);
  const changedFields = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ChildenRef = useRef(null);
  const codeDebouncer = useDebounce(form?.emp_code, 500);
  const [isOpen, setIsOpen] = useState(false);
  const refEsi = useRef(null);
  const refPf = useRef(null);
  const refGt = useRef(null);
  const refMc = useRef(null);
  const refGg = useRef(null);
  useEffect(() => {
    if (id) {
      Promise.allSettled([serviceGetEmployeeEditInfo({ emp_id: id })]).then(
        (promises) => {
          const empData = promises[0]?.value?.data;
          const { nominees, ...rest } = empData;
          setForm({
            ...initialForm,
            ...rest,
            image: "",
          });

          setTimeout(() => {
            if (nominees?.length > 0) {
              const esiData = nominees?.find((obj) => obj?.type === "ESI");
              const pfData = nominees?.find((obj) => obj?.type === "PF");
              const gtData = nominees?.find(
                (obj) => obj?.type === "GROUP_TERM"
              );
              const mcData = nominees?.find(
                (obj) => obj?.type === "MEDI_CLAIM"
              );
              const ggData = nominees?.find(
                (obj) => obj?.type === "GROUP_GRATUITY"
              );
              esiData && refEsi?.current?.setData(esiData);
              pfData && refPf?.current?.setData(pfData);
              gtData && refGt?.current?.setData(gtData);
              mcData && refMc?.current?.setData(mcData);
              ggData && refGg?.current?.setData(ggData);
            }
          }, 0);
          setEditData(empData);
          console.log("nominees", nominees);
          if (nominees?.length > 0) {
            let filteredArr = nominees?.map(
              ({ type, name, relation, dob, aadhar_no }) => ({
                type,
                name,
                relation,
                dob,
                aadhar_no,
              })
            );
            setNomineeDataIn(filteredArr);
          }
          setIsLoading(false);
        }
      );
    }
  }, [id]);
  const toggleDialog = useCallback(() => {
    setIsOpen((e) => !e);
  }, [isOpen]);
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
          if (changedFields.current.indexOf("current_address") < 0) {
            changedFields.current = [
              ...changedFields.current,
              "current_address",
            ];
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

  const getSelectedValue = (arr1, arr2) => {
    let matchingObjects = [];
    for (let obj1 of arr1) {
      for (let obj2 of arr2) {
        if (obj1.type === obj2.type) {
          matchingObjects.push(obj1);
          break;
        }
      }
    }
    return matchingObjects;
  };
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
      const nomineedata = [
        refEsi.current.getData(),
        refPf.current.getData(),
        refGt.current.getData(),
        refMc.current.getData(),
        refGg.current.getData(),
      ];
      const hasChanged = nomineedata.some((obj) => obj?.isChanged === true);
      let isChangedValue = nomineedata.filter(
        (obj) => obj?.isChanged && obj?.name !== ""
      );

      nomineedata.forEach((obj) => {
        delete obj?.isChanged;
      });
      if (hasChanged) {
        const getFilteredArr =
          nomineeDataIn?.length > 0
            ? getSelectedValue(nomineeDataIn, isChangedValue)
            : [];
            //filtered value of the api data
        changedData.push({
          key: "nominees",
          is_json: true,
          db_value: "",
          new_value: JSON.stringify(isChangedValue),
          old_value: JSON.stringify(nomineeDataIn ? nomineeDataIn : []),
        });
      }
      fd.append("emp_id", id);
      fd.append("data", JSON.stringify(changedData));
      if (form?.image) {
        fd.append("image", form?.image);
      }
      setIsSubmitting(false);
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
  }, [form, isSubmitting, id, editData, setIsSubmitting, nomineeDataIn]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValid = ChildenRef?.current?.isValid();
    const isEsiIncludeValid = refEsi?.current?.isValid();
    const isPfValid = refPf?.current?.isValid();
    const isGtValid = refGt?.current?.isValid();
    const isMcValid = refMc?.current?.isValid();
    const isGgValid = refGg?.current?.isValid();

    if (
      Object.keys(errors)?.length > 0 ||
      !isIncludesValid ||
      !isEsiIncludeValid ||
      !isPfValid ||
      !isGtValid ||
      !isMcValid ||
      !isGgValid
    ) {
      setErrorData(errors);
      return true;
    }
    if (isIncludesValid) {
      const { isChanged } = ChildenRef.current.getData();
      const { isChanged: isEsiValue } = refEsi.current.getData();
      const { isChanged: isPfValue } = refPf.current.getData();
      const { isChanged: isGtValue } = refGt.current.getData();
      const { isChanged: isMcValue } = refMc.current.getData();
      const { isChanged: isGgValue } = refGg.current.getData();

      if (
        changedFields?.current?.length === 0 &&
        !isChanged &&
        !isEsiValue &&
        !isPfValue &&
        !isGtValue &&
        !isMcValue &&
        !isGgValue
      ) {
        setIsOpen(false);
        SnackbarUtils.error("No Data Changed");
        return true;
      }
      setIsOpen(false);
      submitToServer();
    }
  }, [checkFormValidation, setErrorData, ChildenRef.current, form]);

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
    isOpen,
    setIsOpen,
    toggleDialog,
    refEsi,
    refPf,
    refGt,
    refMc,
    refGg,
  };
}

export default useMyProfileEdit;
