import React, { useCallback } from "react";
import { useState } from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import {
  serviceGetCandidateEAFDetailsForm,
} from "../../../services/CandidateEAF.service";
import { useEffect } from "react";
import {useParams} from "react-router";

function useCandidateInfo() {
  const [personalData, setPersonalData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (id)
      Promise.allSettled([
        serviceGetCandidateEAFDetailsForm({ candidate_id: id }),
      ]).then((promises) => {
        const candData = promises[0]?.value?.data;
        setPersonalData(candData);
      });
  }, [id]);

  const handlePreviousPage = useCallback(() => {
    historyUtils.push(RouteName.CANDIDATES);
  }, []);
  return {
    handlePreviousPage,
    personalData,
  };
}

export default useCandidateInfo;
