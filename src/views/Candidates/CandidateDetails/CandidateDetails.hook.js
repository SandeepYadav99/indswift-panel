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
import LogUtils from "../../../libs/LogUtils";

function useCandidateDetails() {
  const [value, setValue] = useState(0);
  const [candidateData, setCandidateData] = useState([]);
  const [isResetDialog, setIsResetDialog] = useState(false);
  const [isUpdateDialog, setIsUpdateDialog] = useState(false);
  const [isExtendDialog, setIsExtendDialog] = useState(false);
  const [isReoccuring, setIsReoccuring] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [historyDetail, setHistoryDetail] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    Promise.allSettled([serviceGetCandidateDetails({ id })]).then(
      (promises) => {
        const dataValues = promises[0]?.value?.data;
        setCandidateData(dataValues?.details);
      }
    );

    Promise.allSettled([
      serviceGetCandidateJobHistory({ candidate_id: id }),
      serviceCandidateHistory({ candidate_id: id }),
    ]).then((promises) => {
      const historyData = promises[0]?.value?.data;
      const historyDetailed = promises[1]?.value?.data;
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

  const toggleExtendDialog = useCallback(() => {
    setIsExtendDialog((e) => !e);
  }, [isExtendDialog]);

  const toggleReoccuringDialog = useCallback(() => {
    setIsReoccuring((e) => !e);
  }, [isReoccuring]);

  const handleOfferPage = useCallback((data) => {
    historyUtils.push(RouteName.CANDIDATES_OFFER, {
      candidate_id: data?.id,
      job_id: data?.job_opening_id,
    });
  }, []);
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
    toggleResetDialog,
    isExtendDialog,
    toggleExtendDialog,
    toggleReoccuringDialog,
    isReoccuring,
  };
}

export default useCandidateDetails;
