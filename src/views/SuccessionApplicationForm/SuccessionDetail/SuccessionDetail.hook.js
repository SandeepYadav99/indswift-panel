import { useCallback, useEffect, useState } from "react";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import useEAFSession from "../../EmployeeApplicationForm/EAFSessionHook";
import {
  serviceSuccessionDetail,
  serviceUpdateSuccessionSubmit,
} from "../../../services/Success.service";

const initialForm = {
  reason: "",
  document: null,
};
const useSuccessionForm = () => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const { candidateId } = useEAFSession();
  const [employeeDetail, setEmployeeDetail] = useState({});
  const emp_id = sessionStorage.getItem("EMP_id");
  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );
  useEffect(() => {
    if (emp_id) {
      serviceSuccessionDetail({ code: emp_id }).then((res) => {
        if (!res.error) {
          const tempData = res?.data;
          setEmployeeDetail(tempData);
        }
      });
    }
  }, [emp_id]);

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

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["document", "reason"];
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
  }, [form, errorData, setForm]);

  console.log("form", form);
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      console.log("hit", form);
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["document"].indexOf(key) < 0 && form[key]) {
          fd.append(key, form[key]);
        }
      });
      if (form?.document) {
        fd.append("document", form?.document);
      }
      if (candidateId) {
        fd.append("form_id", candidateId);
      }
      let req = serviceUpdateSuccessionSubmit;
      req(fd).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Placed Successfully");
          historyUtils.push(RouteName.SUCCESSION_SUCCESS);
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, candidateId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===>", { form, errors });
    // LogUtils.log("errors", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }

    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    form,
    submitToServer,
    setForm,
    candidateId,
  ]);

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
    resData,
    isSubmitted,
    declaration,
    setDeclaration,
    employeeDetail,
  };
};

export default useSuccessionForm;
