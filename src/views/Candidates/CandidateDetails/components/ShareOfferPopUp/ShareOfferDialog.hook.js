import {useCallback, useState} from "react";
import {serviceOfferLetterShareCandidate} from "../../../../../services/OfferLetter.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const useShareOfferDialogHook = ({offerId, handleToggle}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShare = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceOfferLetterShareCandidate({ offer_id: offerId }).then(res => {
        if (!res.error) {
          SnackbarUtils.success('Offer letter shared with candidate');
          handleToggle();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [offerId, isSubmitting, setIsSubmitting]);

  return {
    handleShare,
    isSubmitting
  };
};

export default useShareOfferDialogHook;
