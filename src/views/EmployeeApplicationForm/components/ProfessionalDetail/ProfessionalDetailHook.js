import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  isAlpha,
  isAlphaNumChars,
  isNum,
  isSpace,
} from "../../../../libs/RegexUtils";

const is_Referred = [
  "referer_name",
  "referer_designation",
  "referer_department",
  "referer_location",
];
const is_Relative = [
  "relative_name",
  "relative_designation",
  "relative_department",
];
const is_Ailment = ["ailment_type", "ailment_details"];
const initialForm = {
  is_referred: "NO",
  referer_name: "",
  referer_designation: "",
  referer_department: "",
  referer_location: "",
  is_bond: "NO",
  bond_expiry_date: "",
  is_convicted: "NO",
  pending_case_brief: "NO",
  is_personal_transport: "NO",
  transport_details:"",
  is_ailments: "NO",
  ailment_type: "",
  ailment_details: "",
  is_any_relative: "NO",
  relative_name: "",
  relative_designation: "",
  relative_department: "",
  relative_relation: "",
};

const useProfessionalDetail = ({}, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);

  useImperativeHandle(ref, () => ({
    isValid() {
      return handleSubmit();
    },
    setData(data) {
      setForm({
        ...data
      })
    },
    resetData() {
      setForm(JSON.parse(JSON.stringify(initialForm)));
    },
    getData() {
      return {
        data: JSON.parse(JSON.stringify(form)),
      };
    },
  }));

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "is_referred",
      "is_bond",
      "is_convicted",
      "is_personal_transport",
      "is_ailments",
      "is_any_relative",
    ];
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
    if (form?.["is_referred"] && form?.["is_referred"].length > 0) {
      is_Referred.forEach((val) => {
        if (form?.["is_referred"] === "YES" && form?.[val]?.length === 0) {
          errors[val] = true;
        } else if (form?.["is_referred"] === "NO") {
          delete errors[val];
        }
      });
    }
    if (form?.["is_any_relative"] && form?.["is_any_relative"].length > 0) {
      is_Relative.forEach((val) => {
        if (form?.["is_any_relative"] === "YES" && form?.[val]?.length === 0) {
          errors[val] = true;
        } else if (form?.["is_any_relative"] === "NO") {
          delete errors[val];
        }
      });
    }
    if (form?.["is_bond"]) {
      if (
        form?.["is_bond"] === "YES" &&
        form?.["bond_expiry_date"]?.length === 0
      ) {
        errors["bond_expiry_date"] = true;
      } else if (form?.["is_bond"] === "NO") {
        delete errors["bond_expiry_date"];
      }
    }
    if (form?.["is_personal_transport"]) {
      if (
        form?.["is_personal_transport"] === "YES" &&
        form?.["transport_details"]?.length === 0
      ) {
        errors["transport_details"] = true;
      } else if (form?.["is_personal_transport"] === "NO") {
        delete errors["transport_details"];
      }
    }
    if (form?.["is_convicted"]) {
      if (
        form?.["is_convicted"] === "YES" &&
        form?.["pending_case_brief"]?.length === 0
      ) {
        errors["pending_case_brief"] = true;
      } else if (form?.["is_convicted"] === "NO") {
        delete errors["pending_case_brief"];
      }
    }
    if (form?.["is_ailments"]) {
      is_Ailment.forEach((val) => {
        if (form?.["is_ailments"] === "YES" && form?.[val]?.length === 0) {
          errors[val] = true;
        } else if (form?.["is_ailments"] === "NO") {
          delete errors[val];
        }
      });
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    setErrorData({...errors})
    return errors;
  }, [form, errorData, form?.is_referred, form?.is_any_relative]);

  const handleSubmit = useCallback(() => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return false;
    }
    console.log(">hjdh",errorData)
    return true;
  }, [checkFormValidation, setErrorData, form,errorData]);

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

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    isLoading,
    isSubmitting,
    errorData,
    isEdit,
    includeRef,
    handleReset,
  };
};

export default useProfessionalDetail;
