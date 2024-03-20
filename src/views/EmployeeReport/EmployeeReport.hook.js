import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchEmployeeReport,
  actionSetPageEmployeeReportRequests,
} from "../../actions/EmployeeReport.action";
import { serviceGetList } from "../../services/Common.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import { serviceEmployeeReportDownload } from "../../services/EmployeeReport.service";
import historyUtils from "../../libs/history.utils";

const useEmployeeReport = ({}) => {
  const [isInfoPanel, setInfoPanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [selected, setSelected] = useState([]);
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateNotError, setDateNotError] = useState(true);
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
    const type = sessionStorage.getItem("type");
    const start = sessionStorage.getItem("start");
    const end = sessionStorage.getItem("end");

    if (type) {
      setType(type);
    }
    if (start) {
      setStartDate(start);
    }
    if (end) {
      setEndDate(end);
    }
  }, []);

  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.employeeReport);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  useEffect(() => {
    const startDateYearValue = convert(startDate);
    const endDateYearValue = convert(endDate);
    const prevYear = startDateYearValue.slice(0, 4);
    const newYear = endDateYearValue.slice(0, 4);
    const prevMonth = startDateYearValue.slice(5, 7);
    const newMonth = endDateYearValue.slice(5, 7);
    const prevDate = startDateYearValue.slice(8, 10);
    const newDate = endDateYearValue.slice(8, 10);

    if (newYear >= prevYear) {
      if (newMonth > prevMonth) {
        setDateNotError(true);
      } else if (prevMonth === newMonth && newDate >= prevDate) {
        setDateNotError(true);
      } else {
        setDateNotError(false);
      }
    }
  });


  const handleDownload = useCallback(() => {
    if (type && startDate && endDate ) {
        serviceEmployeeReportDownload({
          start_date: startDate,
          end_date: endDate,
          type: type,
        }).then((res) => {
          if (!res.error) {
            const data = res.data?.response;
            window.open(data, "_blank");
          }
        });
    }
  }, [query, queryData, startDate, endDate, type]);

  const resetData = useCallback(
    (sort = {}, updateQuery = {}) => {
      dispatch(
        actionFetchEmployeeReport(
          1,
          { sortingData, ...sort },
          {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,
            start_date: startDate,
            end_date: endDate,
            type: type,
            ...updateQuery,
          }
        )
      );
      isMountRef.current = true;
    },
    [query, queryData, startDate, sortingData, type, endDate]
  );
  const handleChangeDate = useCallback(
    (Date, name) => {
      if (name == "start") {
        setStartDate(Date);
        sessionStorage.setItem("start", Date);
      } else if (name == "end") {
        setEndDate(Date);
        sessionStorage.setItem("end", Date);
      }
    },
    [startDate, setStartDate, setEndDate, endDate]
  );

  const initialApiCall = useCallback(() => {
    if (startDate && endDate && type ) {
      if(dateNotError){
        resetData();
      }
      else {
        SnackbarUtils.error("Start Date cannot be Greater than End Date")
      }
    }
  }, [type, setStartDate, endDate, endDate, setEndDate,dateNotError]);

  const handlePageChange = useCallback(
    (type2) => {
      dispatch(
        actionSetPageEmployeeReportRequests(type2, {
          start_date: startDate,
          end_date: endDate,
          type: type,
        })
      );
    },
    [endDate, endDate, type]
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
      dispatch(actionSetPageEmployeeReportRequests(1));
      resetData({ row, order }, {});
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
    editData,
    warehouses,
    handleChangeDate,
    startDate,
    endDate,
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
  };
};

export default useEmployeeReport;
