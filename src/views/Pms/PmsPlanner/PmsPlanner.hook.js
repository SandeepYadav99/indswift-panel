import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreatePmsPlanner,
  actionDeletePmsPlanner,
  actionFetchPmsPlanner,
  actionSetPagePmsPlanner,
  actionUpdatePlannerStatus,
} from "../../../actions/PmsPlanner.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceAssignReviewPlanner } from "../../../services/PmsPlanner.service";
import Constants from "../../../config/constants";
const usePmsPlanner = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [approveDialog, setApproveDialog] = useState(false);
  const [selectedStatus,setSelectedStatus]=useState('')
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    EMPLOYEES: [],
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isPannel, setIsPannel] = useState(false);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.pmsPlanner);
  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);
  useEffect(() => {
    dispatch(
      actionFetchPmsPlanner(1, sortingData, {
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

  const togglePanel = useCallback(
    (data) => {
      if (data) {
        setSelectedStatus(data?.type_four_status)
        setSelectedUser({
          name: data?.employee?.name,
          id: data?.employee?.id,
          code: data?.employee?.emp_code,
          image: data?.employee?.image,
          review_id: data?.id,
          type_four_bars_rating: data?.type_four_bars_rating,
          is_editable:
            [
              Constants.PMS_4B_BATCH_STATUS.PENDING,
              Constants.PMS_4B_BATCH_STATUS.PANEL_SET,
            ].indexOf(data?.type_four_status) >= 0,
        });
      } else {
        setSelectedUser(null);
        setSelectedStatus(null)
      }
      setIsPannel((e) => !e);
    },
    [setIsPannel, setSelectedUser,setSelectedStatus]
  );

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPagePmsPlanner(type));
  }, []);

  const handleCsvDownload = useCallback((payload) => {
    // serviceRunAssignBatches({}).then((res) => {
    //   if (!res.error) {
    //     SnackbarUtils.success('Batching Process has been started. Please wait for 2 minutes data will be updated soon');
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 1000 * 60 *2);
    //   }
    // }
    // );
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreatePmsPlanner(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchPmsPlanner(1, sortingData, {
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
      // dispatch(actionSetPagePmsPlanner(1));
      dispatch(
        actionFetchPmsPlanner(
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
      dispatch(actionDeletePmsPlanner(id));
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

  const handleViewDetails = useCallback((data) => {
    LogUtils.log({
      reviewerId: data.reviewer_id,
      pms_batch: data.batch,
      pms_form_type: data.form_type,
      batch_id: data.id,
    });
    historyUtils.push(
      `${RouteName.EMPLOYEE_DETAIL}${data?.employee?.emp_code}`
    );
  }, []);

  const handleViewFormDetails = useCallback((data) => {
    historyUtils.push(`${RouteName.PMS_FORM_DETAIL}${data?.id}`, {
      type: data?.form_type,
    });
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
        fields: ["PENDING",  "PANEL_SET", "REVIEW_PENDING", "REVIEW_SUBMITTED"],
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
  const handleAccept =useCallback(()=>{
    LogUtils.log('clicked')
  },[])
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
      serviceAssignReviewPlanner({ review_ids: batchIds }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Planners Aligned SuccessFully");
          setSelected([]);
          dispatch(
            actionUpdatePlannerStatus(
              batchIds,
              Constants.PMS_4B_BATCH_STATUS.REVIEW_PENDING
            )
          );
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSending(false);
      });
    }
  }, [selected, isSending, setIsSending, setSelected]);

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
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
    togglePanel,
    isPannel,
    selectedUser,
    selectedStatus,
    toggleStatusDialog,
    approveDialog,
    handleAccept
  };
};

export default usePmsPlanner;
