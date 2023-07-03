import React, { useCallback, useEffect, useRef, useState } from "react";
import { serviceGetList } from "../../../services/Common.service";
import { serviceGetPMS4BReviewDetail } from "../../../services/PmsPendingReview.service";
import { serviceGetPmsNormalizeGraphData, serviceGetPmsNormalizeTableData } from "../../../services/PmsNormalize.service";

function usePmsGraphHook() {
  const [graphLoc, setGraphLoc] = useState("");
  const [fyYear, setFyYear] = useState("");
  const [batch, setBatch] = useState("");
  const [graphData, setGraphData] = useState({});
  const [tableData,setTableData]=useState({})
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const isMount = useRef(false);

  const resetData = useCallback(() => {
    Promise.allSettled([
      serviceGetPmsNormalizeGraphData({
        batch: batch,
        year: fyYear,
        location_id: graphLoc,
      }),
      serviceGetPmsNormalizeTableData({
        batch: batch,
        year: fyYear,
      })
    ]).then((promises)=>{
      const graphData = promises[0]?.value?.data;
      const graphtableData=promises[1]?.value?.data;
      setGraphData(graphData);
      setTableData(graphtableData)
    })
  }, [fyYear, graphLoc, batch]);

  console.log('>>>>>',graphData,tableData)
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
  };
}

export default usePmsGraphHook;
