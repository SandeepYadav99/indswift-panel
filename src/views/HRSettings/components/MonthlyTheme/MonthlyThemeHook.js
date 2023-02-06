import { useCallback } from "react";
import { useState } from "react";
import KnowledgeImages from "../../../../assets/img/knowledge center illustration.png";
import { serviceUploadEmployeeInduction } from "../../../../services/AppSettings.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { useSelector } from "react-redux";
function MonthlyThemeHook() {
  const [document, setDocument] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { EMPLOYEE_INDUCTION } = useSelector((state) => state.app_setting);

  const handleSubmit = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      fd.append("document", document);
      fd.append("cover_image", coverImage);
      serviceUploadEmployeeInduction(fd).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Employee Induction Document Uploaded");
          setDocument(null);
        }

        setIsSubmitting(false);
      });
    }
  }, [isSubmitting, setIsSubmitting, document, setDocument, coverImage]);

  const handleChange = useCallback(
    (file) => {
      setDocument(file);
    },
    [setDocument]
  );

  const handleCoverImageChange = useCallback(
    (file) => {
      setCoverImage(file);
    },
    [setCoverImage]
  );

  const getImageUrl = useCallback(() => {
    if (document) {
      return URL.createObjectURL(document);
    }
    return require("../../../../assets/img/profile.png");
  }, [document]);

  return {
    document,
    handleChange,
    handleSubmit,
    error,
    getImageUrl,
    isSubmitting,
    coverImage,
    handleCoverImageChange,
    EMPLOYEE_INDUCTION,
  };
}

export default MonthlyThemeHook;
