import React from "react";
import { useCallback } from "react";
import { useState } from "react";

function VacanciesListHook() {
  const [candidateEl, setCandidateEl] = useState(null);
  const [isNewPosition, setIsNewPosition] = useState(false);
  const [isReplacingPopUp, setIsReplacingPopUp] = useState(false);
  const toggleReplaceDialog = useCallback(() => {
    setIsReplacingPopUp((e) => !e);
  }, [setIsReplacingPopUp]);

  const togglePositionDialog = useCallback(() => {
    setIsNewPosition((e) => !e);
  }, [setIsNewPosition]);
  const handleCandidateMenu = useCallback(
    (type) => {
      if (type === "NEW") {
        setIsNewPosition(true);
      } else {
        setIsReplacingPopUp(true);
      }
      setCandidateEl(null);
    },
    [isNewPosition, isReplacingPopUp]
  );
  const handleAddCandidate = useCallback(
    (event) => {
      setCandidateEl(event.currentTarget);
    },
    [setCandidateEl]
  );

  const handleCloseCandidateEl = useCallback(() => {
    setCandidateEl(null);
  }, [setCandidateEl]);

  return {
    handleAddCandidate,
    candidateEl,
    handleCloseCandidateEl,
    handleCandidateMenu,
    toggleReplaceDialog,
    isReplacingPopUp,
    isNewPosition,
    togglePositionDialog,
  };
}

export default VacanciesListHook;
