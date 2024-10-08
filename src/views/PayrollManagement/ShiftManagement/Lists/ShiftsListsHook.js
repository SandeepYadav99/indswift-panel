import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";

import {
  actionDeleteShift,
  actionFetchShifts,
  actionSetPageShifts,
} from "../../../../actions/ShiftsLists.action";

const useShiftsListsHook = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isSidePanelHours, setSidePanelHours] = useState(false);
  const [isDelete,setIsDelete] = useState(false);
  const [deleteId,setDeleteId]=useState(null)
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [machineId, setMachineId] = useState("");
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.Shifts);

  useEffect(() => {
    dispatch(
      actionFetchShifts(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageShifts(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);

      dispatch(
        actionFetchShifts(1, sortingData, {
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

  const handleSortOrderChange = useCallback(
    (row, order) => {
      dispatch(actionSetPageShifts(1));
      dispatch(
        actionFetchShifts(
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

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      data ? setUpdateData(data) : setUpdateData(null);
    },
    [setSidePanel, setUpdateData]
  );

  const toggleDelete = useCallback(
    (data) => {
      setIsDelete((e) => !e);
      data ? setDeleteId(data) : setDeleteId(null);
    },
    [isDelete,setDeleteId,deleteId]
  );

  const handleToggleSidePannelHours = useCallback(() => {
    setSidePanelHours((e) => !e);
    setMachineId("");
  }, [setSidePanelHours, setMachineId]);

  const handleSideToggle = useCallback(
    (data) => {
      historyUtils.push(RouteName.LOCATIONS_UPDATE + data?.id);
    },
    [setEditData, setSidePanel]
  );

  // const handleViewDetails = useCallback((data) => {
  //   setSidePanel((e) => !e);
  //   setMachineId(data?.id)
  // }, [setSidePanel, setMachineId]);

  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.LOCATIONS_CREATE);
  }, []);

  const handleViewShiftDetail = useCallback((shift) => {
    historyUtils.push(`${RouteName.SHIFTS_DETAILS}${shift?.id}`);
  }, []);

  const handleViewDelete = useCallback((shift) => {
    dispatch(actionDeleteShift(shift?.id));
    dispatch(actionFetchShifts(1, {}, {}));
  }, []);
  const configFilter = useMemo(() => {
    return [
      {
        label: "Created Date",
        options: { maxDate: new Date() },
        name: "createdAt",
        type: "date",
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["INACTIVE", "ACTIVE"],
      },
    ];
  }, [role]);

  return {
    handlePageChange,

    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDelete,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,
    handleToggleSidePannel,
    id: machineId,
    isSidePanelHours,
    handleToggleSidePannelHours,
    handleViewShiftDetail,
    updateData,
    toggleDelete,
    isDelete,
    deleteId
  };
};

export default useShiftsListsHook;
