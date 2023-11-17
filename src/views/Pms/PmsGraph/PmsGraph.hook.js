import React, { useCallback, useEffect, useRef, useState } from "react";
import { serviceGetList } from "../../../services/Common.service";
import {
  serviceGetPmsNormalizeGraphData,
  serviceGetPmsNormalizeTableData,
} from "../../../services/PmsNormalize.service";

function usePmsGraphHook() {
  const [graphLoc, setGraphLoc] = useState("ALL");
  const [fyYear, setFyYear] = useState("");
  const [batch, setBatch] = useState("");
  const [graphData, setGraphData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [avgData, setAvgData] = useState([]);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });

  const resetData = useCallback(() => {
    Promise.allSettled([
      serviceGetPmsNormalizeGraphData({
        batch: batch,
        year: fyYear,
        location_id: graphLoc === "ALL" ? "" : graphLoc,
      }),
      serviceGetPmsNormalizeTableData({
        batch: batch,
        year: fyYear,
      }),
    ]).then((promises) => {
      const graphDatas = promises[0]?.value?.data;
      const graphtableData = promises[1]?.value?.data;
      graphDatas?.grades?.sort((a, b) => (a?.code < b?.code ? 1 : -1));
      setGraphData(graphDatas);
      setTableData(graphtableData);
      if (graphDatas?.grades?.length > 0) {
        const gradeObjects = graphDatas?.grades?.map((item) => {
          const rating = item?.ratings?.find((r) => r.key === "avg");
          return { grade: item.code, ...rating };
        });
        setAvgData(gradeObjects);
      }
    });
  }, [fyYear, graphLoc, batch]);

  const initialApiCall = useCallback(() => {
    if (fyYear && batch) {
      resetData();
    }
  }, [graphLoc, setFyYear, batch, batch, setBatch]);

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  return {
    listData,
    fyYear,
    graphLoc,
    setGraphLoc,
    batch,
    setBatch,
    setFyYear,
    initialApiCall,
    graphData,
    tableData,
    avgData,
  };
}

export default usePmsGraphHook;
