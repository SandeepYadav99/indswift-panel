import React from "react";
import { useCallback } from "react";
import { useState } from "react";

function CandidateOLRHook() {
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
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
  };
}

export default CandidateOLRHook;
