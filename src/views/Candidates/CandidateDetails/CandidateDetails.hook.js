import React, { useEffect, useState } from "react";
import {
  serviceCandidateHistory,
  serviceCheckCandidatePRC,
  serviceGetCandidateDetails,
  serviceGetCandidateJobHistory,
  serviceResendEaf,
} from "../../../services/Candidate.service";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";
import { useParams } from "react-router";
import { useCallback } from "react";
import { serviceSendIrfReminder } from "../../../services/CVShortlist.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";

function useCandidateDetails() {
  const [value, setValue] = useState(0);
  const [candidateData, setCandidateData] = useState([]);
  const [isResetDialog, setIsResetDialog] = useState(false);
  const [isUpdateDialog, setIsUpdateDialog] = useState(false);
  const [isExtendDialog, setIsExtendDialog] = useState(false);
  const [checkPrc,setCheckPrc]=useState(false)
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [isEafDialog, setIsEafDialog] = useState(false);
  const [isReoccuring, setIsReoccuring] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [historyDetail, setHistoryDetail] = useState([]);
  const { id } = useParams();

  const toggleConfirmDialog = useCallback(() => {
    setIsConfirmDialog((e) => !e);
  }, [isConfirmDialog]);

  const toggleEafDialog = useCallback(() => {
    setIsEafDialog((e) => !e);
  }, [isEafDialog]);

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
      serviceCheckCandidatePRC({candidate_id: id})
    ]).then((promises) => {
      const historyData = promises[0]?.value?.data;
      const historyDetailed = promises[1]?.value?.data;
      const checkPRCavailable= promises[2]?.value?.data
      setHistoryData(historyData);
      setHistoryDetail(historyDetailed);
      setCheckPrc(checkPRCavailable)
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

  const handleShare = useCallback(() => {

  }, []);
  const handleCVShortlistReminder = useCallback(() => {
    if (candidateData) {
      serviceSendIrfReminder({
        candidate_id: candidateData?.id,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("IRF form send successfully");
          toggleConfirmDialog()
        }
      });
    }
  }, [candidateData]);

  const handleResendEafClick = useCallback(() => {
    if (candidateData) {
      serviceResendEaf(candidateData?.id).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("EAF form send successfully");
          toggleEafDialog()
        }
      });
    }
  }, [candidateData]);

  const handleStatusUpdate = useCallback((data) => {
    toggleStatusDialog();
    setCandidateData({
      ...candidateData,
      ...data
    });
  }, [candidateData, setCandidateData, toggleStatusDialog]);

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
    id,
    handleShare,
    handleStatusUpdate,
    isConfirmDialog,
    isEafDialog,
    toggleConfirmDialog,
    toggleEafDialog,
    handleCVShortlistReminder,
    handleResendEafClick,
    checkPrc
  };
}

export default useCandidateDetails;
