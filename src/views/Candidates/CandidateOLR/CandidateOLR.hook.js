import React, {useEffect} from "react";
import { useCallback } from "react";
import { useState } from "react";
import {useParams} from "react-router";
import {serviceGetOfferLetterDetails,serviceGetPanelistDetails} from "../../../services/OfferLetter.service";

function CandidateOLRHook({location}) {
  const isReview = location?.state?.isReview;
  const isApproval = location?.state?.isApproval;
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [panelList,setPanelList]=useState([])
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
  useEffect(() => {
    if (id) {
      serviceGetPanelistDetails({ offer_id: id }).then(res => {
        if (!res.error) {
          setPanelList(res?.data)
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
    id,
    isReview,
    isApproval,
    panelList,
  };
}

export default CandidateOLRHook;
