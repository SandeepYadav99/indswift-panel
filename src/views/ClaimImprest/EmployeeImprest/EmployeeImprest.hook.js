import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEmployeeImprest,
  actionDeleteEmployeeImprest,
  actionFetchEmployeeImprest,
  actionSetPageEmployeeImprestRequests,
  actionUpdateEmployeeImprest,
} from "../../../actions/EmployeeImprest.action";
// import historyUtils from "../../libs/history.utils";
import { serviceGetList } from "../../../services/Common.service";
import LogUtils from "../../../libs/LogUtils";
// import { serviceExportClaimReport } from "../../../services/EmployeeImprest.service";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

const useEmployeeImprest = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [createDD, setCreateDD] = useState(null);
  const [isInfoPanel, setInfoPanel] = useState(false);
  const [selectedAnnualId, setSelectedAnnualId] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isExtendDialog, setIsExtendDialog] = useState(false);
  const [isTraineeDialog, setIsTraineeDialog] = useState(false);
  const [type, setType] = useState("");
  const [listData, setListData] = useState({
    LOCATIONS: [],
    EMPLOYEES:[]
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);

  useEffect(() => {
    serviceGetList(["LOCATIONS","EMPLOYEES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    const storedType = sessionStorage.getItem("currency");
    if (storedType) {
      setType(storedType);
    }
  }, []);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.employeeImprest);

  const toggleExtendDialog = useCallback(() => {
    setIsExtendDialog((e) => !e);
    setCreateDD(false)

  }, [isExtendDialog]);

  const toggleTraineeDialog = useCallback(() => {
    setIsTraineeDialog((e) => !e);
    setCreateDD(false)

  }, [isTraineeDialog]);

  const handleAddCandidate = useCallback(
    (event) => {
      setCreateDD(event.currentTarget);
    },
    [setCreateDD]
  );
  const handleClosedownloadCL = useCallback(() => {
    setCreateDD(null);
  }, [setCreateDD]);

   

  const resetData = useCallback(
    (sort = {}, updateQuery = {}) => {
      dispatch(
        actionFetchEmployeeImprest(
          1,
          { sortingData, ...sort },
          {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,
            currency: type,
            ...updateQuery,
          }
        )
      );
      isMountRef.current = true;
    },
    [query, queryData, sortingData, type]
  );

  useEffect(() => {
    if (type) {
      resetData();
    }
  }, [type]);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEmployeeImprestRequests(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreateEmployeeImprest(data));
      } else {
        dispatch(actionUpdateEmployeeImprest(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      resetData(
        {},
        {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        }
      );
    },
    [query, queryData, resetData]
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
      dispatch(actionSetPageEmployeeImprestRequests(1));
      resetData({ row, order }, {});
    },
    [resetData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteEmployeeImprest(id));
      setSidePanel(false);
      setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleSideInfo = useCallback(
    (data) => {
      setInfoPanel((e) => !e);
      setSelectedAnnualId(data?.id);
    },
    [setInfoPanel, setSelectedAnnualId]
  );

  const handleQueryInfo = useCallback((data) => {
    setInfoPanel(true);
  }, []);

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
      setSidePanel((e) => !e);
    },
    [setEditData, setSidePanel]
  );

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditData(data?.id);
    },
    [setEditData, setSidePanel]
  );

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push("/annual/detail/" + data.id);
  }, []);

  const handleCsvDownload = useCallback(() => {
    // serviceExportClaimReport({
    //   claim_type: type,
    // }).then((res) => {
    //   if (!res.error) {
    //     const data = res.data?.response;
    //     window.open(data, "_blank");
    //   }
    // });
  }, [ type]);
  const configFilter = useMemo(() => {
    return [
      {
        label: "Location",
        name: "location_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.LOCATIONS,
      },
    ];
  }, [listData]);
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
    isSidePanel,
    type,
    configFilter,
    setType,
    selected,
    allSelected,
    setAllSelected,
    isInfoPanel,
    handleSideInfo,
    selectedAnnualId,
    setSelectedAnnualId,
    handleQueryInfo,
    listData,
    handleCsvDownload,
    createDD,
    handleAddCandidate,
    handleClosedownloadCL,
    toggleExtendDialog,
    toggleTraineeDialog,
    isTraineeDialog,
    listData
  };
};

export default useEmployeeImprest;
