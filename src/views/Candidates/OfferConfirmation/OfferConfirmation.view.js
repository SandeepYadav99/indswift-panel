import React, {useEffect, useState} from "react";
import { useCallback } from "react";
import AcceptanceDialog from "./components/AcceptanceDialog/AcceptanceDialog";
import OfferViewer from "./components/OfferView/OfferView";
import ViewDocuments from "../../ViewDocuments/ViewDocuments";
import useEAFSession from "../../EmployeeApplicationForm/EAFSessionHook";
import {
    serviceCandidateOffer, serviceCandidateOfferLetterAccept, serviceCandidateOfferLetterReject,
    serviceGetCandidateOfferLetter
} from "../../../services/CandidateOfferLetterReview.service";
import LogUtils from "../../../libs/LogUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import SnackbarComponent from "../../../components/Snackbar.component";

function OfferConfirmation() {
    const { candidateId } = useEAFSession();
  const [isOpen, setIsOpen] = useState(false);
  const [offerLetter, setOfferLetter] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toggleDialog = useCallback(() => {
    setIsOpen((e) => !e);
  }, [isOpen, setIsOpen]);

  const handleReject = useCallback(() => {
      if (!isSubmitting) {
          setIsSubmitting(true);
          serviceCandidateOfferLetterReject({ candidate_id: candidateId, offer_id: offerLetter?.offer_id }).then((res) => {
              if (!res.error) {
                  SnackbarUtils.success('Offer Rejected Successfully');
                  historyUtils.replace(RouteName.OFFER_SUCCESS, {
                      type: 'Rejected',
                  });
              } else {
                  SnackbarUtils.error(res?.message);
              }
              setIsSubmitting(false);
          });
      }
  }, [setIsSubmitting, isSubmitting, offerLetter, candidateId]);

  const handleAccept = useCallback(() => {
      if (!isSubmitting) {
          setIsSubmitting(true);
          serviceCandidateOfferLetterAccept({ candidate_id: candidateId, offer_id: offerLetter?.offer_id }).then((res) => {
              if (!res.error) {
                  SnackbarUtils.success('Offer Accepted Successfully');
                  historyUtils.replace(RouteName.OFFER_SUCCESS, {
                      type: 'Accepted',
                  });
              } else {
                  SnackbarUtils.error(res?.message);
              }
              setIsSubmitting(false);
              setIsOpen(false);
          });
      }
  }, [setIsSubmitting, isSubmitting, offerLetter, candidateId, setIsOpen]);

  useEffect(() => {
      if (candidateId) {
          serviceGetCandidateOfferLetter({candidate_id: candidateId}).then((res) => {
              if (!res.error) {
                  setOfferLetter(res?.data);
              } else {
                  SnackbarUtils.error(res?.message);
              }
          });
      }
  }, [candidateId]);

  return (
    <div>
      <OfferViewer isSubmitting={isSubmitting} handleReject={handleReject} toggleDialog={toggleDialog}>
          <ViewDocuments location={{state: { url: offerLetter?.offer_letter_path }}} />
      </OfferViewer>
      <AcceptanceDialog isSubmitting={isSubmitting} handleConfirm={handleAccept} handleDialog={toggleDialog} isOpen={isOpen} />
        <SnackbarComponent />
    </div>
  );
}

export default OfferConfirmation;
