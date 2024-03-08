import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateClaimsReport,
  actionDeleteClaimsReport,
  actionFetchClaimsReport,
  actionSetPageClaimsReportRequests,
  actionUpdateClaimsReport,
} from "../../actions/ClaimsReport.action";
import historyUtils from "../../libs/history.utils";
import { serviceGetList } from "../../services/Common.service";
import LogUtils from "../../libs/LogUtils";
import { serviceExportClaimReport } from "../../services/ClaimsReport.service";

const useClaimsReport = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isInfoPanel, setInfoPanel] = useState(false);
  const [selectedAnnualId, setSelectedAnnualId] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [warehouseId, setWareHouseId] = useState("");
  const [type, setType] = useState("");
  const [listData, setListData] = useState({
    LOCATIONS: [],
    FY_YEAR:[]
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);

  useEffect(() => {
    serviceGetList(["LOCATIONS","FY_YEAR"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    const storedYr = sessionStorage.getItem("year");
    const storedType = sessionStorage.getItem("typeClaim");
    if (storedYr) {
      setWareHouseId(storedYr);
    }
    if (storedType) {
      setType(storedType);
    }
  }, []);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.claimsReport);

  const resetData = useCallback(
    (sort = {}, updateQuery = {}) => {
      dispatch(
        actionFetchClaimsReport(
          1,
          { sortingData, ...sort },
          {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,
            fy_year: warehouseId,
            claim_type: type,
            ...updateQuery,
          }
        )
      );
      isMountRef.current = true;
    },
    [query, queryData, warehouseId, sortingData, type]
  );

  useEffect(() => {
    if (warehouseId && type) {
      resetData();
    }
  }, [warehouseId, type]);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageClaimsReportRequests(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreateClaimsReport(data));
      } else {
        dispatch(actionUpdateClaimsReport(data));
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
      dispatch(actionSetPageClaimsReportRequests(1));
      resetData({ row, order }, {});
    },
    [resetData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteClaimsReport(id));
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
    serviceExportClaimReport({
      fy_year: warehouseId,
      claim_type: type,
    }).then((res) => {
      if (!res.error) {
        const data = res.data?.response;
        window.open(data, "_blank");
      }
    });
  }, [warehouseId, type]);
  const handleChangeWareHouse = useCallback(
    (wareHouseId) => {
      LogUtils.log("wareHouseId", wareHouseId);
      setWareHouseId(wareHouseId);
      setSelected([]);
      setAllSelected(false);
    },
    [setWareHouseId, setSelected, setAllSelected]
  );
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
    handleChangeWareHouse,
    warehouseId,
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
  };
};

export default useClaimsReport;
