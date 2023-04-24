import { useCallback, useEffect, useState } from "react";
import { isAlphaNumChars, isUrl, validateUrl } from "../../../libs/RegexUtils";
import {
  serviceCheckHRAnnouncement,
  serviceCreateHRAnnouncement,
  serviceGetHRAnnouncementDetails,
  serviceUpdateHRAnnouncement,
} from "../../../services/HRAnnouncement.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
const initialForm = {
  title: "",
  date: "",
  link: "",
  is_active: true,
  image: null,
};

const useHRAnnouncementCreateViewDetail = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const [listData, setListData] = useState({
    LOCATIONS: [],
    DEPARTMENTS: [],
    EMPLOYEES: [],
  });
  useEffect(() => {
    if (id) {
      serviceGetHRAnnouncementDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...data,
            is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
            date: new Date(data?.date),
          });
          setImage(data?.image);
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);
  useEffect(() => {
    serviceGetList(["LOCATIONS", "DEPARTMENTS", "EMPLOYEES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const handleImageChange = useCallback(
    (file) => {
      if (file && Object.keys(file.target.files).length > 0) {
        setImage(file.target.files[0]);
      }
    },
    [setImage, image]
  );
  useEffect(() => {
    if (image) {
      setForm({
        ...form,
        image: image,
      });
    }
  }, [form?.image, image, setImage]);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["title", "date", "link"];
    if (!id) {
      required.push("image");
    }
    console.log(form, errors);
    required.forEach(
      (val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        }
      },
      [errorData, id, form]
    );
    if (form?.link && !validateUrl(form?.link)) {
      errors["link"] = true;
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
      setIsLoading(true);
      let req = serviceCreateHRAnnouncement;
      if (id) {
        req = serviceUpdateHRAnnouncement;
      }
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["is_active"].indexOf(key) >= 0) {
          fd.append(key, JSON.stringify(form[key]));
        } else {
          if (key === "date") {
            fd.append(key, new Date(form[key]));
          } else {
            fd.append(key, form[key]);
          }
        }
      });
      req(fd).then((res) => {
        if (!res.error) {
          historyUtils.push(RouteName.HR_ANNOUNCEMENT);
        } else {
          SnackbarUtils.success(res.message);
        }
        setIsLoading(false);
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, image]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors)?.length > 0) {
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
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "title") {
        if(text?.length <=180){
          t[fieldName]=text
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
    handleReset,
    id,
    listData,
    image,
    handleImageChange,
  };
};

export default useHRAnnouncementCreateViewDetail;
