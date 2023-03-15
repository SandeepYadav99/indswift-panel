import { useParams } from "react-router";
import React, { useCallback, useEffect, useState } from "react";
import { serviceJobOpeningsDetails } from "../../services/JobOpenings.service";
import SnackbarUtils from "../../libs/SnackbarUtils";

const useJobOpeningDetail = ({}) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isInterviewStatus,setIsInterviewStatus]=useState(-1)
  const handleChangeInterviewStatus=(value)=>{
    console.log('interviewValues',value)
    setIsInterviewStatus(value)
  }

  useEffect(() => {
    setIsLoading(true);
    serviceJobOpeningsDetails({ id: id }).then((res) => {
      if (!res.error) {
        setData(res.data.details);
      } else {
        SnackbarUtils.error(res.message);
      }
      setIsLoading(false);
    });
  }, [id]);


  return {
    isLoading,
    data,
    id,
    isInterviewStatus,
    handleChangeInterviewStatus
  };
};

export default useJobOpeningDetail;
