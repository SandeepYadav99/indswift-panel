import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreatePmsPending,
  actionDeletePmsPending,
  actionFetchPmsPending,
  actionSetPagePmsPending,
  actionUpdatePmsPending,
} from "../../../actions/PmsPending.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import Constants from "../../../config/constants";
import { serviceGetPmsCanReview } from "../../../services/PmsPending.service";
const usePmsPending = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [enableAction,setEnableAction]= useState(false);
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
  } = useSelector((state) => state?.pmsPending);

  useEffect(() => {
    dispatch(
      actionFetchPmsPending(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);


  useEffect(() => {
    Promise.allSettled([
      serviceGetList(["PMS_EMPLOYEES"]),
      serviceGetPmsCanReview({batch_type:"reviewer_batch"}),
    ]).then((promises) => {
      const listData = promises[0]?.value?.data;
      const ActionData = promises[1]?.value?.data?.response?.can_review_batch;
      setListData(listData)
      setEnableAction(ActionData)
    });
  }, []);
  console.log("list", listData);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPagePmsPending(type));
  }, []);
  
  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreatePmsPending(data));
      } else {
        dispatch(actionUpdatePmsPending(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchPmsPending(1, sortingData, {
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
      // dispatch(actionSetPagePmsPending(1));
      dispatch(
        actionFetchPmsPending(
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
      dispatch(actionDeletePmsPending(id));
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
    historyUtils.push(
      `${RouteName.PMS_REVIEW_FORM}${data?.id}`,
      {
        type:data?.form_type
      }
    );
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "PMS Batch",
        name: "batch",
        type: "select",
        fields: ["DTY", "APMS", 'N/A'],
      },

      {
        label: "Status",
        name: "status",
        type: "select",
        fields: Object.keys(Constants.PMS_BATCH_STATUS),
      },


    ];
  }, [listData]);

  return {
    handlePageChange,
    // handleCellClick,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    // handlePreviousPageClick,
    // handleNextPageClick,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    isCalling,
    editData,
    configFilter,
    enableAction
  };
};

export default usePmsPending;
