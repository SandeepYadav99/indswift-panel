import React, {useEffect} from "react";
import { useCallback } from "react";
import { useState } from "react";
import {useParams} from "react-router";
import {serviceGetOfferLetterDetails} from "../../../services/OfferLetter.service";

function CandidateOLRHook() {
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      serviceGetOfferLetterDetails({ id: id }).then(res => {
        if (!res.error) {
          setData(res?.data);
        }
      })
    }
  }, [id]);

  const toggleApprovalDialog = useCallback(() => {
    setIsApprovalPopUp((e) => !e);
  }, [isApprovalPopUp]);

  const toggleRejectDialog = useCallback(() => {
    setIsRejectPopUp((e) => !e);
  }, [isRejectPopUp]);

  return {
    isApprovalPopUp,
    toggleApprovalDialog,
    isRejectPopUp,
    toggleRejectDialog,
    data,
    id
  };
}

export default CandidateOLRHook;
