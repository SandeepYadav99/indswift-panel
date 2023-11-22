import { useCallback, useEffect, useState } from "react";
import {
  serviceGetApprovalDetail,
  serviceGetApprovalSubmit,
} from "../../../../services/SuccessionA.service";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import historyUtils from "../../../../libs/history.utils";
import { serviceGetList } from "../../../../services/Common.service";
import { useMemo } from "react";

const initialForm = {
  replacing_employee_id: "",
  succession: "",
  nature_of_succession: "",
  comment: "",
  last_working_date: "",
  notes: "",
  pending_dues: "",
  extension_status:""
};
const useEmpInformation = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenRejectionDialog, setIsOpenRejectionDialog] = useState(false);
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    EMPLOYEE_SALARY: [],
  });
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      let req = serviceGetApprovalDetail({ review_id: id });
      req.then((data) => {
        setEmployeeDetail(data?.data);
        // if (data?.data?.saj_status !== "PENDING") {
          setForm({
            ...form,
            extension_status:data?.data?.application?.extension_status,
            // succession: data?.data?.saj_status,
          });
        // }
      });
    }
  }, [id]);
  console.log("employeeDetail", employeeDetail);
  useEffect(() => {
    serviceGetList(["EMPLOYEE_SALARY"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  useEffect(() => {
    if (form?.succession === "NOT_IN_PLACE") {
      setForm({ ...form, nature_of_succession: "", replacing_employee_id: "" });
    }
  }, [form?.succession]);
  useEffect(() => {
    if (form?.nature_of_succession === "EXTERNAL") {
      setForm({ ...form, replacing_employee_id: "" });
    }
  }, [form?.nature_of_succession]);
  console.log("form", form);
  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "pending_dues") {
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

  const salaryCost = useMemo(() => {
    const x = employeeDetail?.application?.ctc
      ? employeeDetail?.application?.ctc
      : 1;
    const y = form?.replacing_employee_id?.ctc
      ? Number(form?.replacing_employee_id?.ctc)
      : 1;
    console.log("salaryCost", x, y, (y - x) / x);

    return Math.round((y - x) / x);
  }, [employeeDetail, form?.replacing_employee_id]);

  console.log("salaryCost", salaryCost);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["succession"];
    if (form?.succession === "IN_PLACE") {
      required.push("nature_of_succession");
    }
    if (form?.nature_of_succession === "INTERNAL") {
      required.push("replacing_employee_id");
    }
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
    if (form?.succession === "NOT_IN_PLACE") {
      delete errors["nature_of_succession"];
    }
    if (form?.nature_of_succession === "EXTERNAL") {
      delete errors["replacing_employee_id"];
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const checkFormValidationHR = useCallback(() => {
    const errors = { ...errorData };
    let required = ["pending_dues"];
    if (employeeDetail?.application?.nature_of_succession === "EXTERNAL") {
      required.push("replacing_employee_ctc", "replacing_employee_name");
    }
    if (employeeDetail?.application?.saj_status === "NOT_IN_PLACE") {
      required.push("extension_start_date");
    }
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

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, employeeDetail]);

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        let rep = {};
        if (form?.succession) {
          rep.succession = form?.succession;
          rep.nature_of_succession = form?.nature_of_succession;
          if (form?.replacing_employee_id) {
            rep.replacing_employee_name = form?.replacing_employee_id?.name
              ? form?.replacing_employee_id?.name
              : "";
            rep.replacing_employee_code = form?.replacing_employee_id?.code
              ? form?.replacing_employee_id?.code
              : "";
            rep.replacing_employee_ctc = form?.replacing_employee_id?.ctc
              ? form?.replacing_employee_id?.ctc
              : "";
            rep.replacing_employee_id = form?.replacing_employee_id?.id
              ? form?.replacing_employee_id?.id
              : "";
            // rep.cost_wrt = salaryCost;
          }
        }
        let hrData = {};
        if (employeeDetail?.application?.status === "CEO_APPROVED") {
          hrData.last_working_date = form?.last_working_date;
          hrData.pending_dues = form?.pending_dues;
          hrData.notes = form?.notes;
          if (
            employeeDetail?.application?.nature_of_succession === "EXTERNAL"
          ) {
            hrData.replacing_employee_name = form?.replacing_employee_name;
            hrData.replacing_employee_ctc = form?.replacing_employee_ctc;
          }
          if (employeeDetail?.application?.saj_status === "NOT_IN_PLACE"){
            hrData.extension_end_date = form?.extension_end_date
          }
        }

        const updatedFd = {
          comment: form.comment,
          ...rep,
          ...hrData,
          action: status,
          extension_status:form?.extension_status
        };
        console.log("status", status);
        serviceGetApprovalSubmit({
          review_id: id,
          ...updatedFd,
        }).then((res) => {
          if (!res.error) {
            SnackbarUtils.success(`${status} Successfully`);
            historyUtils.goBack();
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting, salaryCost]
  );
  console.log("form", form);
  const handleSubmit = useCallback(
    (status) => {
      const checkForm = employeeDetail?.application?.status;
      console.log("checkForm", checkForm);
      if (checkForm === "EMPLOYEE_SUBMITTED") {
        const errors = checkFormValidation();
        console.log("===?", form, errors);
        if (Object.keys(errors).length > 0) {
          setErrorData(errors);
          return true;
        }
      }
      if (checkForm === "CEO_APPROVED") {
        const errors = checkFormValidationHR();
        console.log("===?", form, errors);
        if (Object.keys(errors).length > 0) {
          setErrorData(errors);
          return true;
        }
      }
      submitToServer(status);
    },
    [
      checkFormValidation,
      checkFormValidationHR,
      setErrorData,
      form,
      submitToServer,
      salaryCost,
      employeeDetail,
    ]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );
  const toggleIsOpenDialog = useCallback(
    (data) => {
      //   setEmpDetail(data)
      setIsOpenDialog((e) => !e);
    },
    [isOpenDialog]
  );

  const toggleIsOpenRejectionDialog = useCallback(
    (data) => {
      //   setEmpDetail(data)
      setIsOpenRejectionDialog((e) => !e);
    },
    [isOpenDialog]
  );

  return {
    toggleIsOpenDialog,
    isOpenDialog,
    toggleIsOpenRejectionDialog,
    isOpenRejectionDialog,
    id,
    employeeDetail,
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    errorData,
    isSubmitting,
    listData,
    salaryCost,
  };
};

export default useEmpInformation;
