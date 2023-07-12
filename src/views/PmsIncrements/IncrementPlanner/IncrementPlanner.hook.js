import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceIncrementPlannerDownload } from "../../../services/IncrementPlanner.service";
import historyUtils from "../../../libs/history.utils";

const useIncrementPlanner = ({}) => {
  const [isInfoPanel, setInfoPanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [selected, setSelected] = useState([]);
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
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

  const handleDownload = useCallback(() => {
    if (type && year) {
      serviceIncrementPlannerDownload({
        start_date: year,
        type: type,
      }).then((res) => {
        if (!res.error) {
          const data = res.data?.response;
          window.open(data, "_blank");
        }
      });
    } else {
      SnackbarUtils.error("Please Enter year and Type");
    }
  }, [ year, type]);

  const resetData = useCallback(() => {
    console.log("api hit");
  }, []);
  const initialApiCall = useCallback(() => {
    if (year && type) {
      resetData();
    }
  }, [type, setYear]);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    // dispatch(actionSetPageIncrementPlannerRequests(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      resetData(
        {},
      );
    },
    [resetData]
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
      // dispatch(actionSetPageIncrementPlannerRequests(1));
      // resetData({ row, order }, {});
    },
    [resetData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleQueryInfo = useCallback((data) => {
    setInfoPanel(true);
  }, []);
  const handleViewDetails = useCallback((data) => {
    historyUtils.push(`/employees/details/${data?.emp_code}`);
  }, []);
  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: [
          "INACTIVE",
          "ACTIVE",
          "TERMINATED",
          "ABSCONDED",
          "RETIRED",
          "EXPIRED",
        ],
      },
    ];
  }, [listData]);
  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    isCalling,
    warehouses,
    year,
    selected,
    isInfoPanel,
    handleQueryInfo,
    listData,
    type,
    setType,
    initialApiCall,
    configFilter,
    handleDownload,
    handleViewDetails,
    setYear,
  };
};

export default useIncrementPlanner;
