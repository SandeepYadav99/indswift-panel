import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { serviceGetCustomList } from "../../../../../../services/Common.service";
import { isNum } from "../../../../../../libs/RegexUtils";
import historyUtils from "../../../../../../libs/history.utils";
import { useSelector } from "react-redux";
import { serviceCreateEmployeeRecord } from "../../../../../../services/EmployeeRecords.services";

const temp = new Date();

const useEmployeeView = ({
  selectedAnnuals,
  closeSidePanel,
  originWarehouseId,
}) => {
  const { employeeData } = useSelector((state) => state.employee);
  const initialForm = {
    title: "",
    type: "",
    date_of_issue: "",
    document: "",
    letter_head_no: "",
    employee_id: employeeData.id,
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [warehouses, setWarehouses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [listData, setListData] = useState({
    TYPE_OF_LETTER: [
      { id: 1, name: "Performance review" },
      { id: 1, name: "Appreciation" },
      { id: 1, name: "Warning" },
      { id: 1, name: "Show Cause" },
      { id: 1, name: "Disciplinary" },
    ],
  });

  useEffect(() => {}, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "title",
      "type",
      "date_of_issue",
      "document",
      "letter_head_no",
      "employee_id",
    ];
    required.forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
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
      let req = serviceCreateEmployeeRecord;
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["is_active"].indexOf(key) >= 0) {
          fd.append(key, JSON.stringify(form[key]));
        } else {
          if (key === "date_of_issue") {
            fd.append(key, new Date(form[key]));
          } else {
            fd.append(key, form[key]);
          }
        }
      });
      req(fd).then((res) => {
        console.log(res, "===one");
        if (!res.error) {
          console.log(res, "===one");
          // historyUtils.push(RouteName.HR_ANNOUNCEMENT);
        } else {
          console.log(res, "===two");
          // SnackbarUtils.success(res.message);
        }
        // setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errors = checkFormValidation();
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
      console.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };
      if (
        fieldName === "names" ||
        fieldName === "truck_no" ||
        fieldName == "idendity_proof"
      ) {
        if (!text || (isNum(text) && text.toString().length <= 30)) {
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
    users,
    listData,
  };
};

export default useEmployeeView;
