import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionAlignPmsOverallHod,
  actionCreatePmsOverallHod,
  actionDeletePmsOverallHod,
  actionFetchPmsOverallHod,
  actionSetPagePmsOverallHod,
} from "../../../../actions/PmsOverallHod.action";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";
import { serviceGetList } from "../../../../services/Common.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import {serviceAlignPmsOverallHodBatch} from "../../../../services/PmsOverallHod.service";
const usePmsOverallHod = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [approveDialog, setApproveDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    EMPLOYEES: [],
  });
  const [isSending, setIsSending] = useState(false);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.pmsHodBatches);

  useEffect(() => {
    dispatch(
      actionFetchPmsOverallHod(1, sortingData, {
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
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPagePmsOverallHod(type));
  }, []);

  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);

  const handleCsvDownload = useCallback(
    (payload) => {
      setApproveDialog(false);
      // serviceRunAssignBatches({}).then((res) => {
      //   if (!res.error) {
      //     SnackbarUtils.success('Batching Process has been started. Please wait for 2 minutes data will be updated soon');
      //     setTimeout(() => {
      //       window.location.reload();
      //     }, 1000 * 60 *2);
      //   }
      // });
    }, [setApproveDialog]);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreatePmsOverallHod(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchPmsOverallHod(1, sortingData, {
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
      // dispatch(actionSetPagePmsOverallHod(1));
      dispatch(
        actionFetchPmsOverallHod(
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
      dispatch(actionDeletePmsOverallHod(id));
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
    historyUtils.push(`${RouteName.PERFORMANCE_BATCH}`, {
      overall_hod_batch_id: data.id,
    }); //+data.id
  }, []);

  const handleViewFormDetails = useCallback((data) => {
    historyUtils.push(
      `${RouteName.PMS_FORM_DETAIL}${data?.id}`,
      {
        type: data?.form_type
      }
    );
  }, []);
  const configFilter = useMemo(() => {
    return [
      {
        label: "PMS Batch",
        name: "batch",
        type: "select",
        fields: ["DTY", "APMS"],
      },

      {
        label: "Form Type",
        name: "form_type",
        type: "select",
        fields: ["TYPE_1", "TYPE_2", "TYPE_3", "TYPE_4"],
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: [
          "NORMALIZED",
          "HOD_SUBMITTED",
          "HOD_PENDING"
        ],
      },
    ];
  }, [listData]);

  const handleCheckbox = useCallback(
    (data) => {
      const tempSelected = JSON.parse(JSON.stringify(selected));
      const tempIndex = tempSelected.findIndex((sel) => sel.id === data.id);
      if (tempIndex >= 0) {
        tempSelected.splice(tempIndex, 1);
      } else {
        tempSelected.push(data);
      }
      setSelected(tempSelected);
    },
    [selected, setSelected]
  );

  const selectedEmps = useMemo(() => {
    let total = 0;
    selected.forEach((val) => {
      total += val?.total_employees;
    });
    return total;
  }, [selected]);

  const handleSend = useCallback(() => {
    if (!isSending) {
      setIsSending(true);
      const batchIds = selected.map((val) => val.id);
      serviceAlignPmsOverallHodBatch(batchIds).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Batches Aligned SuccessFully");
          setSelected([]);
          dispatch(actionAlignPmsOverallHod(batchIds));
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSending(false);
      });
    }
  }, [selected, isSending, setIsSending, setSelected]);

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
    selected,
    handleCheckbox,
    isSending,
    handleSend,
    selectedEmps,
    handleViewFormDetails,
    toggleStatusDialog,
        approveDialog,
  };
};

export default usePmsOverallHod;
