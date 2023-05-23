import React from "react";
import { useCallback } from "react";
import { useState } from "react";

function useReviewDetail() {
  const [isEmployeeDialog, setIsEmployeeDialog] = useState(false);

  const toggleEmployeeDialog = useCallback(() => {
    console.log(isEmployeeDialog);
    setIsEmployeeDialog((e) => !e);
  }, [isEmployeeDialog]);

  return {
    toggleEmployeeDialog,
    isEmployeeDialog,
  };
}

export default useReviewDetail;
