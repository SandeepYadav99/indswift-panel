import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { serviceCandidateFeedbackDetails } from '../../services/CandidateFeedback.service'

function useCandidateFeedbackFormView() {
  const [data,setData]=useState([])
  const {id}=useParams()
  console.log(id)
  useEffect(() => {
    serviceCandidateFeedbackDetails({id:id}).then((res) => {
        if (!res.error) {
          console.log("======>",res?.data)
            // setInterviewData(res?.data);
        }
        // setIsLoading(false);
    });
}, []);
  return (
    {
      data
    }
  )
}

export default useCandidateFeedbackFormView