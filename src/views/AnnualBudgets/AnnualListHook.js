import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateAnnual,
  actionDeleteAnnual,
  actionFetchAnnual,
  actionSetPageAnnualRequests,
  actionUpdateAnnual,
} from "../../actions/Annual.action";
import historyUtils from "../../libs/history.utils";
import { serviceGetList } from "../../services/Common.service";
import LogUtils from "../../libs/LogUtils";
import { serviceGetSanctionDetail } from "../../services/Annual.service";

const useAnnualList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isInfoPanel, setInfoPanel] = useState(false);
  const [selectedAnnualId, setSelectedAnnualId] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [warehouseId, setWareHouseId] = useState("");
  const [type,setType]=useState("")
  const [locationId, setLocationId] = useState("");
  const [sanction,SetSanction]=useState({})
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    const storedLoc = sessionStorage.getItem("location");
    const storedYr = sessionStorage.getItem("warehouse");
    const storedType= sessionStorage.getItem("type");
    if (storedLoc) {
      setLocationId(storedLoc);
    }
    if (storedYr) {
      setWareHouseId(storedYr);
    }
    if(storedType){
      setType(storedType)
    }
  }, []);
  useEffect(()=>{
    if (warehouseId && locationId && type) {
    serviceGetSanctionDetail({location_id:locationId,fy_year:warehouseId,employee_type:type}).then((res) => {
      if (!res.error) {
        SetSanction(res.data);
      }
    });
  }
  },[warehouseId, locationId,type])
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.annual);

  const resetData = useCallback(
    (sort = {}, updateQuery = {}) => {
      dispatch(
        actionFetchAnnual(
          1,
          { sortingData, ...sort },
          {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,
            fy_year: warehouseId,
            location_id: locationId,
            employee_type:type,
            ...updateQuery,
          }
        )
      );
      isMountRef.current = true;
    },
    [query, queryData, warehouseId, sortingData, type,locationId]
  );

  useEffect(() => {
    if (warehouseId && locationId && type) {
      resetData();
    }
  }, [warehouseId, locationId,type]);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageAnnualRequests(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreateAnnual(data));
      } else {
        dispatch(actionUpdateAnnual(data));
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
      dispatch(actionSetPageAnnualRequests(1));
      resetData({ row, order }, {});
    },
    [resetData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteAnnual(id));
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

  const handleChangeWareHouse = useCallback(
    (wareHouseId) => {
      LogUtils.log("wareHouseId", wareHouseId);
      setWareHouseId(wareHouseId);
      setSelected([]);
      setAllSelected(false);
    },
    [setWareHouseId, setSelected, setAllSelected]
  );

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
    warehouses,
    handleChangeWareHouse,
    warehouseId,
    type,
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
    locationId,
    setLocationId,
    sanction
  };
};

export default useAnnualList;
