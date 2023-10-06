import React, { useState } from "react";
import { useCallback } from "react";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { serviceSetEmailTrigger } from "../../../../../services/AppSettings.service";
import { serviceGetList } from "../../../../../services/Common.service";
import { useEffect } from "react";
import { useRef } from "react";

function useEmailCompHook() {
  const initialForm = {
    type: "",
    location_id: [],
    department_id: [],
    designation_id: [],
    grade:[],
    subject: "",
    body: "",
  };
  const [form, setForm] = useState({ ...initialForm });
  const descriptionRef = useRef(null);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({});
  const changeTextData = useCallback(
    (text, fieldName) => {
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
    },
    [form, setForm, errorData]
  );

  useEffect(() => {
    if (form?.type) {
      setForm({
        ...form,
        location_id: [],
        department_id: [],
        designation_id: [],
        grade:[]
      });
    }
  }, [form?.type]);

  useEffect(() => {
    serviceGetList(["DEPARTMENTS", "DESIGNATIONS", "LOCATIONS","GRADES"]).then((res) => {
      if (!res.error) {
        setListData(res?.data);
      }
    });
  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    ["subject",'type'].forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      } else {
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
      let idObject = {
        ...form,
        location_id:
          form?.location_id?.length > 0
            ? form?.location_id.map((item) => item?.id)
            : [],
        department_id:
          form?.department_id?.length > 0
            ? form.department_id.map((item) => item?.id)
            : [],
        designation_id:
          form?.designation_id?.length > 0
            ? form?.designation_id.map((item) => item?.id)
            : [],
            grade:
          form?.grade?.length > 0
            ? form?.grade.map((item) => item?.id)
            : [],
      };
      delete idObject?.type;

      setIsSubmitting(true);
      serviceSetEmailTrigger({
        ...idObject,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success('Email send successfully')
          window.location.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
      // setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting]);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    setErrorData({ ...errors });
    if (Object.keys(errors).length === 0) {
      submitToServer();
    } else {
      console.log(form, errors, "errorFiels");
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,
  ]);
  descriptionRef.current = changeTextData;

  return {
    changeTextData,
    form,
    errorData,
    changeTextData,
    handleSubmit,
    listData,
    descriptionRef,
    isSubmitting
  };
}

export default useEmailCompHook;
