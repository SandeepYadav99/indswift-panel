import React, { useEffect, useState } from "react";
import {
  serviceCandidateHistory,
  serviceGetCandidateDetails,
  serviceGetCandidateJobHistory,
} from "../../../services/Candidate.service";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";
import { useParams } from "react-router";
import { useCallback } from "react";

function useCandidateDetails() {
  const [value, setValue] = React.useState(0);
  const [candidateData, setCandidateData] = useState([]);
  const [isResetDialog, setIsResetDialog] = useState(false);
  const [isUpdateDialog, setIsUpdateDialog] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [historyDetail, setHistoryDetail] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    Promise.allSettled([
      serviceGetCandidateDetails({ id }),
      serviceGetCandidateJobHistory({ candidate_id: id }),
      serviceCandidateHistory({ candidate_id: id }),
    ]).then((promises) => {
      const dataValues = promises[0]?.value?.data;
      const historyData = promises[1]?.value?.data;
      const historyDetailed = promises[2]?.value?.data;
      setCandidateData(dataValues?.details);
      setHistoryData(historyData);
      setHistoryDetail(historyDetailed);
    });
  }, [id]);
  //
  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue);
    },
    [setValue, value]
  );
  const toggleStatusDialog = useCallback(() => {
    setIsUpdateDialog((e) => !e);
  }, [isUpdateDialog]);
  const toggleResetDialog = useCallback(() => {
    setIsResetDialog((e) => !e);
  }, [isResetDialog]);
  const handleOfferPage = (data) => {
    historyUtils.push(RouteName.CANDIDATES_OFFER + data?.id);
  };
  return {
    value,
    candidateData,
    isResetDialog,
    isUpdateDialog,
    historyData,
    historyDetail,
    handleChange,
    toggleStatusDialog,
    handleOfferPage,
    toggleResetDialog
  };
}

export default useCandidateDetails;
