import React, { useEffect, useState } from "react";
import { serviceGetUscList } from "../../../../../services/AppSettings.service";
import RouteName from "../../../../../routes/Route.name";
import historyUtils from "../../../../../libs/history.utils";
import { useCallback } from "react";

function useUSCHook() {
  const [UscData, setUscData] = useState([]);

  useEffect(() => {
    let dataValues = serviceGetUscList();
    dataValues
      .then((data) => {
        setUscData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleViewUpdate = useCallback((data) => {
    historyUtils.push(`${RouteName.HR_USC_UPDATE}${data?.id}`);
  }, []);

  return {
    UscData,
    handleViewUpdate
  };
}

export default useUSCHook;
