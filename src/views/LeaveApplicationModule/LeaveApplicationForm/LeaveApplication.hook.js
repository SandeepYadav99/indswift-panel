import { useState } from "react";

const useLeaveApplication = () => {
  const [leaveType, setLeaveType] = useState("");


  return {
    leaveType,
    setLeaveType,
  };
};

export default useLeaveApplication;
