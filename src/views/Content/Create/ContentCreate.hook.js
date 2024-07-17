import { useCallback, useEffect, useRef, useState } from "react";
import LogUtils from "../../../libs/LogUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import {
  serviceCreateLetterHead,
  serviceGetLetterHeadDetails,
  serviceUpdateLetterHead,
} from "../../../services/LetterHead.service";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/Common.service";

const initialForm = {
  name: "",
  header_image: null,
  footer_image: null,
  is_active: true,
};

const useContentCreate = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [editData, setEditData] = useState({});
  const { id } = useParams();
  const [listData, setListData] = useState({
    LETTER_HEADS: [],
    LETTER_JOURNEYS: [],
    LOCATIONS:[]
  });
  const descriptionRef = useRef(null);

  // useEffect(() => {
  //   if (id) {
  //     let dataValues = serviceGetLetterHeadDetails({ id: id });
  //     dataValues
  //       .then((data) => {
  //         const detail = data?.data?.details;
  //         setEditData(detail);
  //         setForm({
  //           ...form,
  //           name: detail?.name,
  //           is_active: detail?.status === "ACTIVE",
  //         });
  //         console.log(">>>>", detail);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [id]);

  useEffect(() => {
    serviceGetList(["LETTER_HEADS", "LETTER_JOURNEYS","LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name"];
    if (!id) {
      required.push("header_image", "footer_image");
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, id]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      setIsLoading(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["header_image", "footer_image"].indexOf(key) < 0) {
          fd.append(key, form[key]);
        }
      });
      if (form?.header_image) {
        fd.append("header_image", form?.header_image);
      }
      if (form?.footer_image) {
        fd.append("footer_image", form?.footer_image);
      }
      let req = serviceCreateLetterHead;
      if (id) {
        fd.append("id", id);
        req = serviceUpdateLetterHead;
      }
      req(fd).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
        setIsLoading(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("errors", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData, id]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      LogUtils.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };

      t[fieldName] = text;
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

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  descriptionRef.current = changeTextData;

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    handleDelete,
    handleReset,
    declaration,
    setDeclaration,
    editData,
    descriptionRef,
    id,
    listData
  };
};

export default useContentCreate;
