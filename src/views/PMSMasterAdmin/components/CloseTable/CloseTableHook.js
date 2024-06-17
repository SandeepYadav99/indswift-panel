import React, { useCallback, useEffect, useMemo, useState } from "react";
import { servicePmsBatchClose } from "../../../../services/PmsMaster.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

const useCloseTable = ({ Renderdata, getPmsList }) => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [normalize, setNormalize] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleNormalize = useCallback(() => {
    setNormalize((e) => !e);
  }, [normalize]);

  useEffect(() => {
    if (Renderdata?.length > 0) {
      setData(Renderdata ? Renderdata : []);
      setCurrentData(Renderdata ? Renderdata : []);
    }
  }, [Renderdata]);

  const handleCloseBatch = useCallback(() => {
    setIsLoading(true)
    servicePmsBatchClose().then((res) => {
      if (!res.error) {
        SnackbarUtils.success("Closed Successfully");
        getPmsList();
      } else {
        SnackbarUtils.error(res?.message);
      }
    setIsLoading(false)
    });
  }, [getPmsList,isLoading,setIsLoading]);

  return {
    data,
    currentData,
    toggleNormalize,
    normalize,
    handleCloseBatch,
    isLoading
  };
};

export default useCloseTable;
