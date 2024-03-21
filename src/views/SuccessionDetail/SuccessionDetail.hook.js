import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { serviceGetEmployeeDetails } from "../../services/ClaimsManagement.service";
import historyUtils from "../../libs/history.utils";
import { serviceGetList } from "../../services/Common.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import LogUtils from "../../libs/LogUtils";
import { serviceApproveRetireDirect } from "../../services/SuccessionA.service";
import { getSajStatus } from "../../helper/helper";

const initialForm = {
  last_working_date: "",
  extension_end_date: "",
  extension_start_date: "",
  retirement_date: "",
  extension_status: "",
  // saj_status: "",
  medical_condition: "",
  replacing_person_id: "",
  replacing_employee_name: "",
  succession: "",
  replacing_employee_code: "",
  replacing_employee_ctc: "",
  pending_dues: "",
  notes: "",
  form_submitted_at: "",
  document: null,
  form_reason: "",
};
const successionKeys = [
  "succession",
  "nature_of_succession",
  "extension_start_date",
  "extension_end_date",
  "replacing_person_id",
  "last_working_date",
  "medical_condition",
  "retirement_date",
];
const InPlaceRequired = [
  "nature_of_succession",
  "medical_condition",
  "extension_start_date",
  "extension_end_date",
  "replacing_person_id",
  "pending_dues",
];
const NotPlaceRequired = [
  "pending_dues",
  "medical_condition",
  "extension_start_date",
  "extension_end_date",
];
function useSuccessionDetail() {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [listData, setListData] = useState({
    EMPLOYEE_SALARY: [],
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      Promise.allSettled([
        serviceGetEmployeeDetails({ code: id }),
        serviceGetList(["EMPLOYEE_SALARY"]),
      ]).then((promises) => {
        const empDetail = promises[0]?.value?.data;
        const list = promises[1]?.value?.data;
        setEmployeeDetails(empDetail);
        setListData(list);
      });
    }
  }, [id]);

  useEffect(() => {
    if (form?.extension_start_date) {
      var extensionStartDate = new Date(form?.extension_start_date);
      var oneYearAfter = new Date(extensionStartDate);
      oneYearAfter.setFullYear(extensionStartDate.getFullYear() + 1);
      setForm({ ...form, extension_end_date: oneYearAfter });
    }
  }, [form?.extension_start_date]);

  const checkFormValidation = useCallback(() => {
    const errors = {};
    let required = ["extension_status", "form_submitted_at"];

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.extension_status === "EXTENSION") {
      if (!form?.succession) {
        errors["succession"] = true;
      }
    }
    if (form?.succession) {
      const updatedRequired =
        form?.succession === "IN_PLACE" ? InPlaceRequired : NotPlaceRequired;
      console.log("updatedRequired", updatedRequired);
      updatedRequired?.forEach((val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        }
      });
    }
    // console.log(">>>>>1", form?.retirement_date);

    if (form?.nature_of_succession === "EXTERNAL") {
      if (!form?.last_working_date) {
        errors["last_working_date"] = true;
      }
    } else {
      delete errors["last_working_date"];
    }
    if (form?.extension_status === "RETIRE") {
      if (!form?.retirement_date) {
        errors["retirement_date"] = true;
      }
    } else {
      delete errors["retirement_date"];
    }
    // if (form?.bill_date) {
    //   const date = new Date(form?.bill_date);
    //   const todayDate = new Date();
    //   date.setHours(0, 0, 0, 0);
    //   todayDate.setHours(0, 0, 0, 0);
    //   if (date.getTime() > todayDate.getTime()) {
    //     errors["bill_date"] = true;
    //   }
    // }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  console.log("errorData", errorData);
  const salaryCost = useMemo(() => {
    const x = employeeDetails?.application?.ctc
      ? employeeDetails?.application?.ctc
      : 1;
    const y = form?.replacing_person_id?.ctc
      ? Number(form?.replacing_person_id?.ctc)
      : 1;
    console.log("salaryCost", x, y, (y - x) / x);

    return Math.round((y - x) / x);
  }, [employeeDetails, form?.replacing_person_id]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      setIsLoading(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["document", "replacing_person_id"].indexOf(key) < 0 && form[key]) {
          fd.append(key, form[key]);
        }
      });
      if (form?.document) {
        fd.append("document", form?.document);
      }
      if (form?.replacing_person_id?.id) {
        fd.append("replacing_person_id", form?.replacing_person_id?.id);
        fd.append("replacing_employee_name", form?.replacing_person_id?.name);
        fd.append("replacing_employee_code", form?.replacing_person_id?.code);
        fd.append("replacing_employee_ctc", form?.replacing_person_id?.ctc);
      }
      if (employeeDetails?.id) {
        fd.append("emp_id", employeeDetails?.id);
      }
      const sajStatus = getSajStatus(
        form?.succession,
        form?.nature_of_succession
      );
      fd.append("saj_status", sajStatus);
      let req = serviceApproveRetireDirect;
      req(fd).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsLoading(false);
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, employeeDetails]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, employeeDetails]);

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
      LogUtils.log(">>>>", text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "extension_status") {
        if (text === "RETIRE") {
          successionKeys?.forEach((fieldName) => {
            t[fieldName] = "";
          });
        } else {
          t["retirement_date"] = "";
        }
        t[fieldName] = text;
      } else if (fieldName === "succession") {
        if (text === "NOT_IN_PLACE") {
          t["nature_of_succession"] = "";
          t["replacing_person_id"] = "";
          t["last_working_date"] = "";
        }
        t[fieldName] = text;
      } else if (fieldName === "nature_of_succession") {
        if (text === "INTERNAL") {
          t["last_working_date"] = "";
        }
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }
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
    employeeDetails,
    form,
    changeTextData,
    handleSubmit,
    isSubmitting,
    errorData,
    listData,
    salaryCost,
  };
}

export default useSuccessionDetail;
