import { useParams} from "react-router-dom";
import { useState} from "react";
import { serviceLeaveApprove, serviceLeaveReject} from "../../../services/Leave.service";
import { useHistory } from "react-router-dom";

const usePendingApplication = () => {
  const [open,setOpen] = useState(false)
  const [comment,setComment] = useState('');
  const [state,setState] = useState("");

  const history = useHistory();

  const handleOnChange =(e)=>[
    setComment(e.target.value)
  ]

  const handleOpen =()=>{
    setOpen(true);
    setState("Approve");
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
    history.goBack();
    serviceLeaveApprove(parameterOfApproval); 
  }

  const handleReject =()=>{
    setOpen(true) ;
    setState("Reject");
  }

  const rejectApplication =()=>{
    history.goBack();
    serviceLeaveApprove(parameterRejection); 
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
    state,
    rejectApplication,
  };
};

export default usePendingApplication;
