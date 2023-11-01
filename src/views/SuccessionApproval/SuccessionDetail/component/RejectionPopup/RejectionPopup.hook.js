import { useEffect } from "react";
import { useCallback,  useState } from "react";



const initialForm = {
  reason: "",
};

const useRejectionPopup = ({ isOpen, handleToggle, candidateId}) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setErrorData({});
    }
  }, [isOpen, candidateId]);
  const handleSubmit = useCallback(() => {
    if (!isSubmitting) {
      // setIsSubmitting(true);
      handleToggle();
      // if (candidateId) {
      //     serviceVacanciesInactive({ vacancy_id: candidateId , reason: form?.reason}).then(() => {
      //         handleToggle();
      //         SnackbarUtils.success("Inactive successfully");
      //         dispatch(actionGetJobOpeningVacancies(jobId));
      //         setIsSubmitting(false);
      //     });

      // }
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  return {
   
    errorData,
    form,
    handleSubmit,
    
  };
};

export default useRejectionPopup;
