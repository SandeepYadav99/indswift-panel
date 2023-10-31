import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {actionGetJobOpeningVacancies} from "../../../../actions/JobOpeningDetail.action";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

function VacanciesListHook({ jobId }) {
  const [candidateEl, setCandidateEl] = useState(null);
  const [isNewPosition, setIsNewPosition] = useState(false);
  const [isReplacingPopUp, setIsReplacingPopUp] = useState(false);
  const dispatch = useDispatch();

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

  
  const handleSubmit = useCallback(() => {
    setIsReplacingPopUp(false);
    setIsNewPosition(false);
    dispatch(actionGetJobOpeningVacancies(jobId));
    SnackbarUtils.success('Vacancy Added Successfully');
  }, [setIsReplacingPopUp, setIsNewPosition, jobId]);

  return {
    handleAddCandidate,
    candidateEl,
    handleCloseCandidateEl,
    handleCandidateMenu,
    toggleReplaceDialog,
    isReplacingPopUp,
    isNewPosition,
    togglePositionDialog,
    handleSubmit
  };
}

export default VacanciesListHook;
