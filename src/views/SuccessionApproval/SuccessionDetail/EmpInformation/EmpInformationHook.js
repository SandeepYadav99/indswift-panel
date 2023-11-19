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
  type: "",
  succession: "",
  comment: "",
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
      console.log("id",id)
      let req = serviceGetApprovalDetail({ review_id: id });
      req.then((data) => {
        setEmployeeDetail(data?.data);
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
    if (form?.type === "NOT_IN_PLACE") {
      setForm({ ...form, succession: "", replacing_employee_id: "" });
    }
  }, [form?.type]);
  useEffect(() => {
    if (form?.succession === "REPLACEMENT_EXTERNAL") {
      setForm({ ...form, replacing_employee_id: "" });
    }
  }, [form?.succession]);
  console.log("form", form);
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
    let required = ["type", "comment"];
    if (form?.type === "IN_PLACE") {
      required.push("succession");
    }
    if (form?.succession === "REPLACEMENT_INTERNAL") {
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
    if (form?.type === "NOT_IN_PLACE") {
      delete errors["succession"];
    }
    if (form?.succession === "REPLACEMENT_EXTERNAL") {
      delete errors["replacing_employee_id"];
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        let rep = {};
        if (form?.replacing_employee_id) {
          rep.replacing_employee_name = form?.replacing_employee_id?.name
            ? form?.replacing_employee_id?.name
            : "";
          rep.replacing_employee_code = form?.replacing_employee_id?.emp_code
            ? form?.replacing_employee_id?.emp_code
            : "";
          rep.replacing_employee_ctc = form?.replacing_employee_id?.ctc
            ? form?.replacing_employee_id?.ctc
            : "";
          rep.replacing_employee_id = form?.replacing_employee_id?.id
            ? form?.replacing_employee_id?.id
            : "";
          rep.cost_wrt = salaryCost;
        }
        const updatedFd = {
          comment: form.comment,
          ...rep,
          action: status,
        };
        console.log("status", status);
        serviceGetApprovalSubmit({
          review_id: id,
          ...updatedFd,
        }).then((res) => {
          if (!res.error) {
            SnackbarUtils.success("Raised Successfully");
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

  const handleSubmit = useCallback(
    (status) => {
      const checkForm =
        employeeDetail?.application?.status === "EMPLOYEE_SUBMITTED";
      console.log("checkForm", checkForm);
      if (checkForm) {
        const errors = checkFormValidation();
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
