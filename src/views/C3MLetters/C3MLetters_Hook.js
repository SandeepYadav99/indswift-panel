import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { actionFetchC3MLetterList, actionSetPageC3MLetterList } from "../../actions/C3MLetters_action";

const useC3MLetters_Hook = () => {
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
  } = useSelector((state) => state?.C3MLetter);

  useEffect(() => {
    dispatch(
      actionFetchC3MLetterList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);


  const handlePageChange = useCallback((type) => {
   
    dispatch(actionSetPageC3MLetterList(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchC3MLetterList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
    },
    [sortingData, query, queryData]
  );

  const handleFilterDataChange = useCallback(
    (value) => {
    
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
    
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(
        actionFetchC3MLetterList(
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

  const openPDFInNewTab = useCallback((pdfUrl) => {
  console.log(pdfUrl)
   
    if (pdfUrl) {
      window.open(pdfUrl?.joining_letter, "_blank")
   
    }
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
    openPDFInNewTab,
    isCalling,
    editData,
    configFilter,
  };
};

export default useC3MLetters_Hook;
