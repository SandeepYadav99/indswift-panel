import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionAlignPmsSiteReview,
  actionCreatePmsSiteReview,
  actionDeletePmsSiteReview,
  actionFetchPmsSiteReview,
  actionSetPagePmsSiteReview,
} from "../../../actions/PmsSiteReview.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import {
  serviceAlignPmsBatch,
  serviceExportPMSReview,
} from "../../../services/PmsSiteReview.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
const usePmsSiteReview = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [approveDialog, setApproveDialog] = useState(false);
  const [normalizeDialog, setNormalizeDialog] = useState(false);
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
  } = useSelector((state) => state?.pmsSiteReview);

  useEffect(() => {
    dispatch(
      actionFetchPmsSiteReview(1, sortingData, {
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
    dispatch(actionSetPagePmsSiteReview(type));
  }, []);

  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);

  const toggleNormalizwDialog = useCallback(() => {
    setNormalizeDialog((e) => !e);
  }, [normalizeDialog]);
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
        dispatch(actionCreatePmsSiteReview(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchPmsSiteReview(1, sortingData, {
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
      // dispatch(actionSetPagePmsSiteReview(1));
      dispatch(
        actionFetchPmsSiteReview(
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
      dispatch(actionDeletePmsSiteReview(id));
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
      pms_site_id: data.id,
    }); //+data.id
  }, []);

  const handleViewFormDetails = useCallback((data) => {
    historyUtils.push(
      `${RouteName.PMS_SITE_SUBMISSION_DETAIL}${data?.id}`);
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
          "PENDING",
            "REVIEW_PENDING",
            "REVIEW_SUBMITTED"
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
      serviceAlignPmsBatch(batchIds).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Reviews Aligned SuccessFully");
          setSelected([]);
          dispatch(actionAlignPmsSiteReview(batchIds));
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
        toggleNormalizwDialog,
        normalizeDialog
  };
};

export default usePmsSiteReview;
