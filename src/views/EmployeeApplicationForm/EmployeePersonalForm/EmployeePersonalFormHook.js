import { useCallback, useEffect, useRef, useState } from "react";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCandidateEafUpdatePersonal,
  serviceGetCandidateEAFDetails,
  serviceGetCandidateEafPersonalDetails,
} from "../../../services/CandidateEAF.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import RouteName from "../../../routes/Route.name";
import useEAFSession from "../EAFSessionHook";

const useEmployeePersonalForm = ({}) => {
  const [image, setImage] = useState(null);
  const { candidateId } = useEAFSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [candidateData, setCandidateData] = useState({});
  const [error, setIsError] = useState(false);

  const refPersonalForm = useRef(null);
  const refContactForm = useRef(null);
  const refFamilyDetail = useRef(null);

  useEffect(() => {
    if (candidateId) {
      serviceGetCandidateEAFDetails({ candidate_id: candidateId }).then(
        (res) => {
          if (!res.error) {
            const tempData = res?.data;
            setCandidateData(tempData?.details);
            setImage(tempData?.details?.image)
          }
        }
      );
      serviceGetCandidateEafPersonalDetails({ candidate_id: candidateId }).then(
        (res) => {
          if (!res.error) {
            const tempData = res?.data?.details;
            if (tempData) {
              const { contact, family, ...rest } = tempData;
              refPersonalForm.current?.setData(rest);
              refContactForm.current?.setData(contact);
              refFamilyDetail.current?.setData(family);
            }
          }
        }
      );
    }
  }, [candidateId]);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleSubmit = useCallback(() => {
    if (!isSubmitting) {
      const isPersonalFormValid = refPersonalForm.current.isValid();
      const isContactFormValid = refContactForm.current.isValid();
      const isFamilyFormValid = refFamilyDetail.current.isValid();
      LogUtils.log(
        "isPerosnalValid",
        isPersonalFormValid,
        isContactFormValid,
        isFamilyFormValid
      );
      if (isPersonalFormValid && isContactFormValid && isFamilyFormValid) {
        setIsSubmitting(true);
        const personalData = refPersonalForm.current.getData();
        const contactData = refContactForm.current.getData();
        const familyData = refFamilyDetail.current.getData();
        const fd = new FormData();
        Object.keys(personalData?.data).forEach((key) => {
          fd.append(key, personalData?.data?.[key]);
        });
        if (image) {
          fd.append("image", image);
        }
        fd.append('candidate_id', candidateId);
        fd.append("contact", JSON.stringify(contactData?.data));
        fd.append("family", JSON.stringify(familyData?.data));
        serviceCandidateEafUpdatePersonal(fd).then((res) => {
          if (!res.error) {
            historyUtils.push(RouteName.EAF_QUALIFICATION_FORM);
            handleScrollToTop()
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    }
  }, [isSubmitting, setIsSubmitting, candidateId, image]);

  const handleImageChange = useCallback(
    (file) => {
      if (file && Object.keys(file.target.files).length > 0) {
        setImage(file.target.files[0]);
      }
    },
    [setImage]
  );
  return {
    refPersonalForm,
    handleSubmit,
    refContactForm,
    refFamilyDetail,
    isSubmitting,
    candidateData,
    image,
    handleImageChange,
    error,
  };
};

export default useEmployeePersonalForm;
