import React, { useCallback } from "react";
import { useState } from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

function useCandidateInfo() {
  const handlePreviousPage=useCallback(()=>{
    historyUtils.push(RouteName.CANDIDATES);
},[]);
  return {
    handlePreviousPage
  };
}

export default useCandidateInfo;
