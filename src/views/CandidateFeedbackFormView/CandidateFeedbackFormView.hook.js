import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import { serviceCandidateFeedbackDetails } from "../../services/CandidateFeedback.service";

function useCandidateFeedbackFormView() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    serviceCandidateFeedbackDetails({ id: id }).then((res) => {
      if (!res.error) {
        setData(res?.data);
      }
      // setIsLoading(false);
    });
  }, []);
  const handleSubmit = (data) => {
    historyUtils.push(RouteName.CANDIDATES_DETAILS + data?.candidate_id);
  };
  return {
    data,
    handleSubmit,
  };
}

export default useCandidateFeedbackFormView;
