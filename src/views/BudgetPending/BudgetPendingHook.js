import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateBudgetPending,
  actionDeleteBudgetPending,
  actionFetchBudgetPending,
  actionSetPageBudgetPending,
  actionUpdateBudgetPending,
} from "../../actions/BudgetPending.action";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";
import historyUtils from "../../libs/history.utils";
import {
  serviceBudgetPendingApprove,
  serviceBudgetPendingReject,
} from "../../services/BudgetPending.service";
import { Snackbar } from "@material-ui/core";
import SnackbarUtils from "../../libs/SnackbarUtils";

const useBudgetPending = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isInfoPanel, setInfoPanel] = useState(false);
  const [selectedAnnualId, setSelectedAnnualId] = useState(null);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.budget_pending);

  useEffect(() => {
    dispatch(
      actionFetchBudgetPending(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);
  const handleSideInfo = useCallback(
    (data) => {
      setInfoPanel((e) => !e);
      setSelectedAnnualId(data?.id);
    },
    [setInfoPanel, setSelectedAnnualId]
  );
  const changeRoute = useCallback((data) => {
    historyUtils.push(RouteName.JOB_OPENINGS_DETAILS + data?.job_details?.id); //+data.id
  }, []);
  const changeEmployeeRoute = useCallback((data) => {
    historyUtils.push(`/employees/details/${data?.code}`);
  }, []);
  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageBudgetPending(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreateBudgetPending(data));
      } else {
        dispatch(actionUpdateBudgetPending(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchBudgetPending(1, sortingData, {
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
  console.log("selectedAnnualId", selectedAnnualId);

  const requestRaisedApi = useCallback((value) => {
    console.log('inside',value)
    let req;
    if (value === "Approved") {
      req = serviceBudgetPendingApprove({ id: selectedAnnualId });
    } else if (value === "Reject") {
      req = serviceBudgetPendingReject({ id: selectedAnnualId });
    }
    if (req) {
      req.then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Raised!");
          setInfoPanel(false);
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [selectedAnnualId]);

  const handleSortOrderChange = useCallback(
    (row, order) => {
      dispatch(
        actionFetchBudgetPending(
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
      dispatch(actionDeleteBudgetPending(id));
      setSidePanel(false);
      setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
      setSidePanel((e) => !e);
    },
    [setEditData, setSidePanel]
  );

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["APPROVED", "PENDING", "REJECTED"],
      },
    ];
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
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    changeRoute,
    changeEmployeeRoute,
    isInfoPanel,
    handleSideInfo,
    selectedAnnualId,
    setSelectedAnnualId,
    requestRaisedApi,
  };
};

export default useBudgetPending;
