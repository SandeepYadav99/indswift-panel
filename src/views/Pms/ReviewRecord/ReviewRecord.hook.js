import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreatePmsNormalize,
  actionDeletePmsNormalize,
  actionFetchPmsNormalize,
  actionSetPagePmsNormalize,
  actionUpdatePmsNormalize,
} from "../../../actions/PmsNormalize.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import {serviceExportPMSBatch} from "../../../services/PmsBatch.service";
import {serviceExportPmsNormalization} from "../../../services/PmsNormalize.service";

const useReviewRecord = ({ location }) => {
  const batchID = location?.state?.batch_id;
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    EMPLOYEES: [],
  });
  console.log('batchId',batchID)
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.PmsNormalize);
  // change store to PmsNormalize
  const {role} = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(
      actionFetchPmsNormalize(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  useEffect(() => {
    serviceGetList(["PMS_EMPLOYEES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  console.log("list", listData);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPagePmsNormalize(type));
  }, []);

  const handleViewGraph = useCallback(() => {
    historyUtils.push(RouteName.PERFORMANCE_GRAPH);
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreatePmsNormalize(data));
      } else {
        dispatch(actionUpdatePmsNormalize(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchPmsNormalize(
          1,
          sortingData,
          {
            query: key == "SEARCH_TEXT" ? value : query,
            query_data: key == "FILTER_DATA" ? value : queryData,
          },
          { batch_id: batchID }
        )
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
      // dispatch(actionSetPagePmsNormalize(1));
      dispatch(
        actionFetchPmsNormalize(
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
      dispatch(actionDeletePmsNormalize(id));
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

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["NORMALIZATION_DONE", "HOD_REVIEWED", "HOD_REVIEW_PENDING"],
      },
    ];
  }, [listData]);

  const handleCsvDownload = useCallback((payload) => {
    serviceExportPmsNormalization({
      row: sortingData?.row,
      order: sortingData?.order,
      query: query,
      query_data: queryData,
    }).then((res) => {
      if (!res.error) {
        const data = res.data?.response;
        window.open(data, "_blank");
      }
    });
  }, [sortingData, query, queryData]);

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
    handleViewGraph,
    role,
    handleCsvDownload
  };
};

export default useReviewRecord;
