import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {
  serviceGetIncrementPlanner,
  serviceIncrementPlannerDownload,
} from "../../../services/IncrementPlanner.service";
import historyUtils from "../../../libs/history.utils";

const totalShow = 50;
const useIncrementPlanner = ({}) => {
  const [isInfoPanel, setInfoPanel] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const toggleConfirmDialog = useCallback(
    (type) => {
      setIsDialog((e) => !e);
    },
    [setIsDialog]
  );
  const resetData = useCallback(() => {
    serviceGetIncrementPlanner({
      year: year,
      batch: type,
    }).then((res) => {
      if (!res.error) {
        const data = res.data;
        setApiData(data);
      }
    });
  }, [year, type]);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

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
  }, [year, type]);

  useEffect(() => {
    _processData();
  }, [data, currentPage]);

  const _processData = useCallback(() => {
    const from = currentPage * totalShow - totalShow;
    let to = currentPage * totalShow;
    if (from <= data?.length) {
      to = to <= data?.length ? to : data?.length;
      setCurrentData(data.slice(from, to));
    }
  }, [setCurrentData, currentPage, data, totalShow]);

  const handlePageChange = useCallback(
    (type) => {
      if (Math.ceil(data?.length / totalShow) >= type + 1) {
        setCurrentPage(type + 1);
        _processData();
      }
    },
    [_processData, setCurrentPage, data]
  );

  const queryFilter = useCallback((key, value) => {
    console.log("_queryFilter", key, value);
  }, []);

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
      if (value) {
        const tempData = apiData?.filter((val) => {
          if (val?.name?.match(new RegExp(value, "ig"))) {
            return val;
          }
        });
        setData(tempData);
      } else {
        setData(apiData);
      }
    },
    [queryFilter, _processData, data, setData, apiData]
  );

  const initialApiCall = useCallback(() => {
    if (year && type) {
      resetData();
    }
  }, [type, setYear]);

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
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
    currentData,
    data: apiData,
    currentPage,
    year,
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
    toggleConfirmDialog,
    isDialog,
  };
};

export default useIncrementPlanner;
