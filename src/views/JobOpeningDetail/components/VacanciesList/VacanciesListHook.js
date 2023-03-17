import React from "react";
import { useCallback } from "react";
import { useState } from "react";

function VacanciesListHook() {
  const [isNewPosition, setIsNewPosition] = useState(false);
  const [isReplacingPopUp, setIsReplacingPopUp] = useState(false);
  const toggleReplaceDialog = useCallback(() => {
    setIsReplacingPopUp((e) => !e);
  }, [setIsReplacingPopUp]);
  const handleCandidateMenu = useCallback(
    (type) => {
      if (type === "NEW") {
        setIsNewPosition(true);
      } else {
        setIsReplacingPopUp(true);
      }
    },
    [isNewPosition, isReplacingPopUp]
  );

  return {
    handleCandidateMenu,
    toggleReplaceDialog,
    isReplacingPopUp

  };
}

export default VacanciesListHook;
