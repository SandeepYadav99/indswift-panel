import React, { useCallback, useEffect, useRef, useState } from "react";
import { serviceGetList } from "../../../services/Common.service";
import { serviceGetPMS4BReviewDetail } from "../../../services/PmsPendingReview.service";
import { serviceGetPmsNormalizeGraphData } from "../../../services/PmsNormalize.service";

function usePmsGraphHook() {
  const [graphLoc, setGraphLoc] = useState("");
  const [fyYear, setFyYear] = useState("");
  const [batch, setBatch] = useState("");
  const [graphData, setGraphData] = useState({});
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const isMount = useRef(false);

  const resetData = useCallback(
    (sort = {}, updateQuery = {}) => {
      console.log("api,call", fyYear, graphLoc, batch);
      if (!isMount.current) {
        serviceGetPmsNormalizeGraphData({ batch: batch, year: fyYear }).then(
          (res) => {
            if (!res.error) {
              setGraphData(res.data);
              console.log("dtata", res.data);
              // setRows(res.data);
              // setColumns([...columns, ...res?.data[0]?.ratings]);
            }
          }
        );
        isMount.current = true;
      }
    },
    [fyYear, graphLoc, batch]
  );

  const initialApiCall = useCallback(() => {
    if (fyYear && batch && graphLoc) {
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
