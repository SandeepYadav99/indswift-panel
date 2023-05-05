import React, {useEffect, useMemo} from "react";
import { useCallback } from "react";
import { useState } from "react";
import {useParams} from "react-router";
import {serviceReviewOLRApprove} from "../../../services/ReviewOLR.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import {serviceGetOfferLetterDetails,serviceGetPanelistDetails} from "../../../services/OfferLetter.service";
import {useSelector} from "react-redux";
import Constants from "../../../config/constants";

function CandidateOLRHook({location}) {
  const isReview = location?.state?.isReview;
  const reviewId = location?.state?.reviewId;
  const isApproval = location?.state?.isApproval;
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [panelList,setPanelList]=useState([])
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState(null);
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const { id } = useParams();
  const {role} = useSelector(state => state.auth);

  const [tableDataValue,setTableDataValue]=useState([{name:'shasank',designation:'manager',department:'Human Resourse'}])
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

  const isRecruiter = useMemo(() => {
    return role === Constants.ROLES.RECRUITER;
  }, [role]);
  const toggleApprovalDialog = useCallback(() => {
    setIsApprovalPopUp((e) => !e);
  }, [isApprovalPopUp]);

  const toggleRejectDialog = useCallback(() => {
    setIsRejectPopUp((e) => !e);
  }, [isRejectPopUp]);

  const handleApproveReview = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceReviewOLRApprove({review_id: reviewId,'is_experience_hide':isChecked}).then((res) => {
        if (!res.error) {
          SnackbarUtils.success('Offer Letter Approved Successfully');
          historyUtils.goBack();
        }
        setIsSubmitting(false);
      });
    }
  }, [isSubmitting, setIsSubmitting, reviewId,isChecked]);
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
    tableDataValue,
    handleApproveReview,
    isSubmitting,
    reviewId,
    isRecruiter,
    isChecked,
    handleCheckboxChange,
    role
  };
}

export default CandidateOLRHook;
