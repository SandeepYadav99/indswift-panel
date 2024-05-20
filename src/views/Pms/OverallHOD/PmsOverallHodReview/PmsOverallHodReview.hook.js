import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreatePmsOverallHodReview,
  actionDeletePmsOverallHodReview,
  actionFetchPmsOverallHodReview,
  actionSetPagePmsOverallHodReview,
  actionUpdatePmsOverallHodReview,
} from "../../../../actions/PmsOverallHodReview.action";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";
import { serviceGetPmsCanReview } from "../../../../services/PmsPending.service";
const usePmsOverallHodReview = ({ location }) => {
  const batchID = location?.state?.batch_id;
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [enableAction,setEnableAction]= useState(false);

  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.pmsOverallHodMyReviews);

  useEffect(() => {
    dispatch(
      actionFetchPmsOverallHodReview(1, sortingData, {
        query: isMountRef.current ? query : null,
      }, { batch_id: batchID })
    );
    isMountRef.current = true;
  }, []);

  useEffect(() => {
    Promise.allSettled([
      serviceGetPmsCanReview({batch_type:"overall_hod_batch"}),
    ]).then((promises) => {
      const listData = promises[0]?.value?.data?.response?.can_review_batch;
      setEnableAction(listData)
    });
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPagePmsOverallHodReview(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreatePmsOverallHodReview(data));
      } else {
        dispatch(actionUpdatePmsOverallHodReview(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchPmsOverallHodReview(1, sortingData, {
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
      // dispatch(actionSetPagePmsOverallHodReview(1));
      dispatch(
        actionFetchPmsOverallHodReview(
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
      dispatch(actionDeletePmsOverallHodReview(id));
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
    historyUtils.push(`${RouteName.PMS_OVERALL_HOD_FORM}${data?.id}`);
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
    enableAction
  };
};

export default usePmsOverallHodReview;
