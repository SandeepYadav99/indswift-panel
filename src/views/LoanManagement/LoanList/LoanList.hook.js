import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchLoanList,
  actionSetPageLoanList,
} from "../../../actions/LoanList.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";

const useLoanList = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    HR: [],
    JOB_OPENINGS: [],
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.loanList);
  useEffect(() => {
    dispatch(
      actionFetchLoanList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);
 
  useEffect(() => {
    serviceGetList(["LOCATIONS", "HR", "JOB_OPENINGS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  console.log("list", listData);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageLoanList(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageLoanListRequests(1));
      dispatch(
        actionFetchLoanList(1, sortingData, {
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
        actionFetchLoanList(
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

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.CLAIMS_DETAILS}${data?.id}`); //+data.id
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Location",
        name: "employeesObj.location_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.LOCATIONS,
      },
      {
        label: "Status",
        name: "claimObj.status",
        type: "select",
        fields: [
          "REJECTED",
          "PENDING",
          "APPROVED",
          "PROCESSED",
          "HOD_APPROVED",
          "SITE_HR_APPROVED",
          "CORPORATE_AUDIT_1_APPROVED",
          "CORPORATE_AUDIT_2_APPROVED",
          "ACCOUNTS_APPROVED",
        ],
      }
    ];
  }, [listData]);

 
  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleViewDetails,
    isCalling,
    configFilter,
  };
};

export default useLoanList;
