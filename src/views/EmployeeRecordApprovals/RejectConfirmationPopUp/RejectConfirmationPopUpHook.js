import { useCallback } from "react";
import {  useState } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {  serviceEmployeeRecordApprovalReject } from "../../../services/EmpeRecordApproval.service";

const useRejectConfirmationPopUpHook = ({ offerId , handleToggle, handleClose}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    (val) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
      let req = serviceEmployeeRecordApprovalReject;

        req({ id: offerId }).then((res) => {
          if (!res.error) {

            handleToggle()
            handleClose()
            window.location.reload()
          } else {

            SnackbarUtils.error(res?.message);
          }

          setIsSubmitting(false);
        });
      }
    },

    [isSubmitting, setIsSubmitting, offerId]
  );

  return {
    handleSubmit,
  };
};

export default useRejectConfirmationPopUpHook;
