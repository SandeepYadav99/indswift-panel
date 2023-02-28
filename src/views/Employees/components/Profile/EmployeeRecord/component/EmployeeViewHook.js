import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { serviceGetCustomList } from "../../../../../../services/Common.service";
import { isNum } from "../../../../../../libs/RegexUtils";
import historyUtils from "../../../../../../libs/history.utils";

const temp = new Date();

const initialForm = {
  letter_title: "",
  type_of_letter: "",
  date_of_issue: "",
  document: "",
  letter_head: "",
};

const useEmployeeView = ({
  selectedAnnuals,
  closeSidePanel,
  originWarehouseId,
}) => {
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
      "letter_title",
      "type_of_letter",
      "date_of_issue",
      "document",
      "letter_head",
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
    }
  }, []);

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
