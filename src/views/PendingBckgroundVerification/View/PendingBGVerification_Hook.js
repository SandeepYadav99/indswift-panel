import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import ReactDOM from "react-dom";

import {
  actionFetchPendingBGVList,
  actionSetPagePendingBGVList,
} from "../../../actions/PendingBGVerification.action";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

const usePendingBGVerification_Hook = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  
  const [listData, setListData] = useState({
    EMPLOYEES: [],
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.pendingBGV);

  useEffect(() => {
    dispatch(
      actionFetchPendingBGVList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  // useEffect(() => {
  //   serviceGetList(["LOCATIONS"]).then((res) => {
  //     if (!res.error) {
  //       setListData(res.data);
  //     }
  //   });
  // }, []);
  console.log("list", listData);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPagePendingBGVList(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchPendingBGVList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
    },
    [sortingData, query, queryData]
  );

  const handleFilterDataChange = useCallback(
    (value) => {
      console.log("_handleFilterDataChange", value);
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(
        actionFetchPendingBGVList(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
          }
        )
      );
    },
    [query, queryData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  // const openPDFInNewTab = useCallback((pdfUrl) => {
  //   const newWindow = window.open("", "_blank");
  //   if (newWindow) {
  //     window.open(pdfUrl, "_blank");
  //     // ReactDOM.render(<a href={pdfUrl} target="_blank"/>, newWindow.document.body);
  //   }
  // }, []);

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(`${RouteName.PENDING_VERIFICATION_CREATE}${data?.id}`);
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: [
          "ACTIVE",
          "RESIGNED",
          "TERMINATED",
          "RETIRED",
          "EXPIRED",
          "ABSCONDED",
          "INACTIVE",
        ],
      },
    ];
  }, [listData]);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
  
    isCalling,
    editData,
    configFilter,
    handleViewDetails,
  };
};

export default usePendingBGVerification_Hook;
