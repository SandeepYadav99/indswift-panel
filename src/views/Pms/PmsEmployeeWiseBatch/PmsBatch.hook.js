import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreatePmsBatch,
  actionDeletePmsBatch,
  actionFetchPmsBatch,
  actionSetPagePmsBatch,
  actionUpdatePmsBatch,
} from "../../../actions/PmsBatch.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import {serviceExportPMSBatch} from "../../../services/PmsBatch.service";
const usePmsBatch = ({ location }) => {
  const reviewerId = location?.state?.reviewerId;
  const batchType = location?.state?.pms_batch;
  const formType = location?.state?.pms_form_type;
  const batchID = location?.state?.batch_id;
  const hodBatchId = location?.state?.hoc_batch_id;
  const overallHodBatchId = location?.state?.overall_hod_batch_id;
  const pmsSiteId = location?.state?.pms_site_id;
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
  } = useSelector((state) => state?.pmsBatch);

  useEffect(() => {
    dispatch(
      actionFetchPmsBatch(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : ((reviewerId && false) ? [
          { label: 'PMS Batch', name: 'pms_batch', type: 'select', value: batchType },
          { label: 'PMS Batch', name: 'pms_form_type', type: 'select', value: formType },
          { label: 'PMS Batch', name: 'pms_reviewer_id', type: 'selectObject', value: reviewerId }
        ] : []),
      }, { batch_id: batchID, hod_batch_id: hodBatchId, overall_hod_batch_id: overallHodBatchId, pms_site_id: pmsSiteId })
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
    dispatch(actionSetPagePmsBatch(type));
  }, []);

  const handleCsvDownload = useCallback((payload) => {
    serviceExportPMSBatch({
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

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreatePmsBatch(data));
      } else {
        dispatch(actionUpdatePmsBatch(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchPmsBatch(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        }, { batch_id: batchID, hod_batch_id: hodBatchId, overall_hod_batch_id: overallHodBatchId, pms_site_id: pmsSiteId })
      );
    },
    [sortingData, query, queryData, batchID, hodBatchId, overallHodBatchId, pmsSiteId]);

  const handleFilterDataChange = useCallback(
    (value) => {
      // onsole.log('_handleSearchValueChange', value);
      // queryFilter('SEARCH_TEXT', value);
      const updatedData = value?.map((item)=>{
        return {
          ...item,
          value: item?.type === "selectAuto" ?  item?.value?.id : item.value,
          type:item?.type === "selectAuto" ? "selectObject" :item?.type
        }
      })
      console.log("_handleFilterDataChange",updatedData);
      queryFilter("FILTER_DATA", updatedData);
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
      // dispatch(actionSetPagePmsBatch(1));
      dispatch(
        actionFetchPmsBatch(
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
      dispatch(actionDeletePmsBatch(id));
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
        label: "PMS Batch",
        name: "pms_batch",
        type: "select",
        fields: ["DTY", "APMS", 'N/A'],
      },
      {
        label: "PMS Form",
        name: "pms_form_type",
        type: "select",
        fields: ["TYPE_1", "TYPE_2", 'TYPE_3', 'TYPE_4'],
      },
      {
        label: "PMS reviewer",
        name: "pms_reviewer_id",
        type: "selectAuto",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.PMS_EMPLOYEES,
      },
      // {
      //   label: "Status",
      //   name: "status",
      //   type: "select",
      //   fields: [
      //     "ACTIVE",
      //     "RESIGNED",
      //     "TERMINATED",
      //     "RETIRED",
      //     "EXPIRED",
      //     "ABSCONDED",
      //     "INACTIVE",
      //   ],
      // },

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
    handleCsvDownload,
    pmsSiteId,
    hodBatchId,
    overallHodBatchId
  };
};

export default usePmsBatch;
