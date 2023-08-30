import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { serviceGetList } from "../../services/Common.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import {
  serviceEmployeeSalaryReportExcelDownload,
  serviceGetEmployeeSalaryReport,
} from "../../services/EmployeeSalaryReport.service";

const totalShow = 50;
const useIncrementEmployeeSalaryReport = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listType, setListType] = useState("");
  const [isInfoPanel, setInfoPanel] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startValid, setStartValid] = useState(false);
  const [type, setType] = useState("");
  const [formData, setFormData] = useState({});

  const [listData, setListData] = useState({
    LOCATIONS: [],
    DESIGNATIONS: [],
    DEPARTMENTS: [],
    GRADES: [],
  });

  useEffect(() => {
    serviceGetList(["LOCATIONS", "DEPARTMENTS", "DESIGNATIONS", "GRADES"]).then(
      (res) => {
        if (!res.error) {
          setListData(res.data);
        }
      }
    );
  }, []);

  const resetData = useCallback(() => {
    setIsCalling(true);
    serviceGetEmployeeSalaryReport({
      start_date: startDate,
    }).then((res) => {
      if (!res.error) {
        const data = res.data;
        setApiData(data);
      }
      setIsCalling(false);
    });
  }, [type, setIsCalling, startDate, listType]);

  const checkValidation = (start) => {
    if (!start) {
      setStartValid(true);
      return false;
    }
    setStartValid(false);
    return true;
  };

  const initialApiCall = useCallback(() => {
    const checkVaid = checkValidation(startDate);
    if (startDate && checkVaid) {
      resetData();
    }
  }, [type, startDate, type, listType]);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  const handleDownload = useCallback(() => {
    if (startDate) {
      serviceEmployeeSalaryReportExcelDownload({
        start_date: startDate,
        index: 1,
        query: null,
        query_data: null,
      }).then((res) => {
        if (!res.error) {
          const data = res.data;
          window.open(data, "_blank");
        }
      });
    } else {
      SnackbarUtils.error("Please Select the Batch");
    }
  }, [startDate, type, listType]);

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
      if (value && Array.isArray(value) && value.length > 0) {
        let tData = [...apiData];
        let filteredData = [];
        for (const filterObj of value) {
          const { name, value } = filterObj;
          if (name !== "is_modified") {
            tData = tData.filter((obj) => {
              return obj[name] === value;
            });
          }
        }
        setData(tData);
      } else {
        setData(apiData);
      }
    },
    [queryFilter, apiData, data, setData]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
      if (value) {
        const tempData = apiData?.filter((val) => {
          if (
            val?._id?.name?.match(new RegExp(value, "ig")) ||
            val?._id?.emp_code?.match(new RegExp(value, "ig"))
          ) {
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

  useEffect(() => {
    if (type) {
      setListType("");
    }
  }, [type]);

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
      // ...[
      //   {
      //     label: "Location",
      //     name: "loc_id",
      //     type: "selectObject",
      //     custom: { extract: { id: "id", title: "name" } },
      //     fields: listData?.LOCATIONS,
      //   },
      // ],
      {
        label: "Grade",
        name: "grade_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "label" } },
        fields: listData?.GRADES,
      },
      // {
      //   label: "Department",
      //   name: "department_id",
      //   type: "selectObject",
      //   custom: { extract: { id: "id", title: "name" } },
      //   fields: listData?.DEPARTMENTS,
      // },
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
    isInfoPanel,
    handleQueryInfo,
    listData,
    type,
    setType,
    initialApiCall,
    configFilter,
    handleDownload,
    handleViewDetails,
    isDialog,
    formData,
    isSubmitting,
    startDate,
    listType,
    setListType,
    startValid,
    setStartDate,
  };
};

export default useIncrementEmployeeSalaryReport;
