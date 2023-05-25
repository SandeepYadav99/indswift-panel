import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreatePmsPendingReview,
  actionDeletePmsPendingReview,
  actionFetchPmsPendingReview,
  actionSetPagePmsPendingReview,
  actionUpdatePmsPendingReview,
} from "../../../actions/PmsPendingReview.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
const usePmsPendingReview = ({ location }) => {
  const batchID = location?.state?.batch_id;
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.pmsPendingReview);

  useEffect(() => {
    dispatch(
      actionFetchPmsPendingReview(1, sortingData, {
        query: isMountRef.current ? query : null,
      }, { batch_id: batchID })
    );
    isMountRef.current = true;
  }, []);
   
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPagePmsPendingReview(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreatePmsPendingReview(data));
      } else {
        dispatch(actionUpdatePmsPendingReview(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchPmsPendingReview(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        }, {batch_id: batchID})
      );
    },
    [sortingData, query, queryData, batchID]
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
      // dispatch(actionSetPagePmsPendingReview(1));
      dispatch(
        actionFetchPmsPendingReview(
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

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeletePmsPendingReview(id));
      setEditData(null);
    },
    [setEditData]
  );

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
    },
    [setEditData]
  );

  const handleSideToggle = useCallback(() => {
    historyUtils.push(RouteName.CANDIDATES_CREATE);
    // setEditData(null);
  }, [setEditData]);

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(`${RouteName.EMPLOYEE_DETAIL}${data?.emp_code}`); //+data.id
  }, []);

   

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    isCalling,
    editData,
  };
};

export default usePmsPendingReview;
