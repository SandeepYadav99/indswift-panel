import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import { serviceLeaveApprove, serviceLeaveReject} from "../../../services/Leave.service";

const usePendingApplication = () => {
  const [open,setOpen] = useState(false)
  const [comment,setComment] = useState('');


  const handleOnChange =(e)=>[
    setComment(e.target.value)
  ]

  const handleOpen =()=>{
    setOpen(true);
  }


  const handleClose =()=>{
    setOpen(false);
  }

  const { id } = useParams();

  let parameterOfApproval ={
    "review_id":id,
    "comment":comment,
  }

  let parameterRejection ={
    "review_id":id,
    "comment":comment,
  }

  const handleSubmit =()=>{
    setOpen(false) 
    serviceLeaveApprove(parameterOfApproval); 
  }

  const handleReject =()=>{
    serviceLeaveReject(parameterRejection);
  }
  return {
    id,
    handleSubmit,
    handleReject,
    open,
    handleOpen,
    handleClose,
    handleOnChange,
    comment,
  };
};

export default usePendingApplication;
