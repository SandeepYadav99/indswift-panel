import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";
import { actionFetchImprest } from "../../../../../actions/Imprest.action";
import { useRef } from "react";

const totalShow = 10;
const useImprestUpperTable = ({ jobId }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isInfoPanel, setInfoPanel] = useState(false);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.imprest);

  useEffect(() => {
    dispatch(
      actionFetchImprest(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const changeRoute = useCallback(() => {
    historyUtils.push(RouteName.CLAIMS_IMPREST_CREATE);
  }, []);
  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchImprest(1, sortingData, {
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
      dispatch(
        actionFetchImprest(
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
  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: [
          "APPROVED",
          "PENDING",
          "REJECTED",
          "HOD_APPROVED",
          "SITE_HR_APPROVED",
          "ACCOUNTS_APPROVAL",
          "ACCOUNTS_APPROVED",
          "CORPORATE_AUDIT_1_APPROVED",
          "CORPORATE_AUDIT_2_APPROVED",
          "CORPORATE_HR_APPROVED",
          "ACCOUNTS_APPROVED",
          "ACCOUNTS_APPROVAL",
          "FINANCE_APPROVED",
        ],
      },
    ];
  }, []);

  const handleViewDetails = useCallback((data) => {
    console.log(data)
    historyUtils.push(RouteName.CLAIMS_IMPREST_DETAILS + data?.id) 
}, []);
  return {
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    isCalling,
    editData,
    configFilter,
    changeRoute,
    isInfoPanel,
    handleViewDetails
  };
};

export default useImprestUpperTable;
