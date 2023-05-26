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

  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.employeeReport);

  const handleDownload = useCallback(() => {
    if (type && startDate && endDate) {
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
    }else{
        SnackbarUtils.error('Please Enter StartDate EndDate and Type')
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
      } else if (name == "end") {
        setEndDate(Date);
      }
    },
    [startDate, setStartDate, setEndDate, endDate]
  );

  const initialApiCall = useCallback(() => {
    if (startDate && endDate && type) {
      resetData();
    }
  }, [type, setStartDate, endDate, endDate, setEndDate]);
  
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEmployeeReportRequests(type));
  }, []);

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
        fields: ["INACTIVE", "ACTIVE","TERMINATED","ABSCONDED","RETIRED","EXPIRED"]
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
    handleViewDetails
  };
};

export default useEmployeeReport;
