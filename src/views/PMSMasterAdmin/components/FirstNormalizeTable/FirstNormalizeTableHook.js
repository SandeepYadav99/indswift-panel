import React, { useCallback, useEffect, useMemo, useState } from "react";

const useFirstNormalizeTable = ({ Renderdata, getPmsList }) => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [normalize, setNormalize] = useState(false);

  const toggleNormalize = useCallback(() => {
    setNormalize((e) => !e);
  }, [normalize]);

  useEffect(() => {
    if (Renderdata?.length > 0) {
      setData(Renderdata ? Renderdata : []);
      setCurrentData(Renderdata ? Renderdata : []);
    }
  }, [Renderdata]);

  return {
    data,
    currentData,
    toggleNormalize,
    normalize,
  };
};

export default useFirstNormalizeTable;
