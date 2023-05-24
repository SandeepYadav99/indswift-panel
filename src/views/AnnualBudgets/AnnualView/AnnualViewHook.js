import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isNum } from "../../../libs/RegexUtils";
import {
  serviceAnnualDetail,
  serviceCreateAnnual,
} from "../../../services/Annual.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

const initialForm = {
  budget: "",
  posted: "",
  transferred: "",
  vacancies: "",
  expense_budget: "",
};

const useAnnualView = ({
  selectedAnnuals,
  closeSidePanel,
  originWarehouseId,
  id,
}) => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [editData, setEditData] = useState({});
  const [profileInfo,setProfileInfo]=useState({})
  const [warehouses, setWarehouses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (id) {
      serviceAnnualDetail({ id: id }).then((res) => {
        if (!res?.error) {
          const empData = res?.data;
          setProfileInfo({...empData})
          const data = {};
          Object.keys({ ...empData }).forEach((key) => {
            if (key in initialForm) {
              data[key] = empData[key];
            }
          });
          setEditData({ ...data });
          setForm({ ...initialForm, ...data });
        }
      });
    }
  }, [id]);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["budget", "posted", "transferred", "expense_budget"];
    required.forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      }
      if (form?.[val] === 0) {
        delete errors[val];
      }
    });
    if (form?.vacancies < 0) {
      errors["vacancies"] = true;
    } else {
      delete errors["vacancies"];
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
      const updateData = {};

      updateData.annual_budget_id = id;
      updateData.new_values = form;

      serviceCreateAnnual(updateData).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Raised!");
          historyUtils.push("/annual");
          closeSidePanel();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, editData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errors = checkFormValidation();
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
      submitToServer();
    },
    [checkFormValidation, setErrorData, form, submitToServer, editData]
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
      if (text >= 0) {
        t[fieldName] = text;
      }
      if (fieldName === "budget" || "posted" || "transferred") {
        const vaccanciesdata = t?.budget - t?.posted - t?.transferred;
        t["vacancies"] = vaccanciesdata;
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
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    warehouses,
    setForm,
    users,
    profileInfo
  };
};

export default useAnnualView;
