import {useCallback, useEffect} from "react";
import { useState } from "react";
import { serviceUploadEmployeeInduction } from "../../../../../services/AppSettings.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { useSelector } from "react-redux";
import {serviceGetMonthlyThemes} from "../../../../../services/MonthlyTheme.service";

function useMonthlyThemeHook() {
  const [data, setData] = useState([]);
  const [isCalling, setIsCalling] = useState(true);

  useEffect(() => {
    serviceGetMonthlyThemes().then((res) => {
      if (!res.error) {
        setData(res.data);
      }
      setIsCalling(false)
    })
  }, [])

  return {
    data,
    isCalling
  };
}

export default useMonthlyThemeHook;
