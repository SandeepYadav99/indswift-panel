import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react';

function CandidateOLRHook() {
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const toggleApprovalDialog = useCallback(() => {
    setIsApprovalPopUp((e) => !e);
  }, [isApprovalPopUp]);
  return (
    {
      isApprovalPopUp,
      toggleApprovalDialog

    }
  )
}

export default CandidateOLRHook