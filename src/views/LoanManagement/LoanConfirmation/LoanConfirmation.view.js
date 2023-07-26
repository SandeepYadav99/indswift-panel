import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import useEAFSession from "../../EmployeeApplicationForm/EAFSessionHook";
import LogUtils from "../../../libs/LogUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import SnackbarComponent from "../../../components/Snackbar.component";
import Constants from "../../../config/constants";
import AcceptanceLoanDialog from "./component/AcceptanceLoanDialog/AcceptanceLoanDialog";
import LoanOfferViewer from "./component/LoanOfferView/LoanOfferView";
import ViewDocuments from "../../ViewDocuments/ViewDocuments";
import {
  serviceApproveLoanList,
  serviceGetDetailsLoanInfo,
  serviceRejectLoanList,
} from "../../../services/LoanList.service";

function LoanConfirmation() {
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
      serviceRejectLoanList({
        guarantee_id: candidateId,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Offer Rejected Successfully");
          historyUtils.replace(RouteName.GUARANTOR_SUCCESS, {
            type: "Rejected",
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
      serviceApproveLoanList({
        guarantee_id: candidateId,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Offer Accepted Successfully");
          historyUtils.replace(RouteName.GUARANTOR_SUCCESS, {
            type: "Accepted",
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
      serviceGetDetailsLoanInfo({ guarantee_id: candidateId }).then((res) => {
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
      <LoanOfferViewer
        isEnabled={
          offerLetter?.status !== Constants.JOB_CANDIDATE_STATUS.DROPPED
        }
        isSubmitting={isSubmitting}
        handleReject={handleReject}
        toggleDialog={toggleDialog}
      >
        <ViewDocuments
          location={{ state: { url: offerLetter?.loan_declaration_path } }}
        />
      </LoanOfferViewer>
      <AcceptanceLoanDialog
        isSubmitting={isSubmitting}
        handleConfirm={handleAccept}
        handleDialog={toggleDialog}
        isOpen={isOpen}
      />
      <SnackbarComponent />
    </div>
  );
}

export default LoanConfirmation;
