import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isNum,
  isSpace,
} from "../../libs/RegexUtils";
import useDebounce from "../../hooks/DebounceHook";
import historyUtils from "../../libs/history.utils";
import {
  serviceCheckSubCategory,
  serviceCreateSubDepartment,
  serviceGetSubDepartmentDetail,
  serviceUpdateSubDepartment,
} from "../../services/SubDepartment.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../config/constants";

const initialForm = {
  name: "",
  code: "",
  is_active: true,
};

const useDepartmentDetail = ({ location }) => {
  const departmentCode = location?.state?.code;
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const codeDebouncer = useDebounce(form?.code, 500);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      serviceGetSubDepartmentDetail({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...data,
            is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (!departmentCode) {
      historyUtils.goBack();
    }
  }, [departmentCode]);

  const checkCodeValidation = useCallback(() => {
    serviceCheckSubCategory({ code: form?.code, id: id ? id : null }).then(
      (res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["code"] = "Department Code Exists";
            setErrorData(errors);
          } else {
            delete errors.code;
            setErrorData(errors);
          }
        }
      }
    );
  }, [errorData, setErrorData, form?.code, id]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "code"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
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
      setIsSubmitting(true);
      let req = serviceCreateSubDepartment;
      if (id) {
        req = serviceUpdateSubDepartment;
      }
      req({
        ...form,
        department_code: departmentCode,
      }).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, departmentCode, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    // LogUtils.log('isValid', includeRef.current.isValid(), errors);
    // const isIncludesValid = includeRef.current.isValid();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, includeRef.current]);

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
      if (fieldName === "name") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
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
    [changeTextData, checkCodeValidation]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    id,
  };
};

export default useDepartmentDetail;
