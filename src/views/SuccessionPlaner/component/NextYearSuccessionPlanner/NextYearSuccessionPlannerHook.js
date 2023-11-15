import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { actionGetJobOpeningCandidates } from "../../../../actions/JobOpeningDetail.action";
import LogUtils from "../../../../libs/LogUtils";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";

const totalShow = 10;
const useNextYearSuccessionPlanner = ({ jobId }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [isSidePanel, setSidePanel] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const { isCandidatesFetching, candidates } = useSelector(
    (state) => state.job_opening_detail
  );
  const [listData, setListData] = useState({
    LOCATIONS: [],
    HR: [],
    JOB_OPENINGS: [],
  });


  useEffect(() => {
    _processData();
  }, [data, currentPage]);

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(`${RouteName.CANDIDATES_DETAILS}${data?.candidate_id}`); //+data.id
  }, []);

  const _processData = useCallback(() => {
    const from = currentPage * totalShow - totalShow;
    let to = currentPage * totalShow;
    // all.filter((val, index) => {
    //     if (index >= (((currentPage) * totalShow) - totalShow) && index < (((currentPage) * totalShow))) {
    //         return val;
    //     }
    // });
    if (from <= data.length) {
      to = to <= data.length ? to : data.length;
      setCurrentData(data.slice(from, to));
    }
  }, [setCurrentData, currentPage, data, totalShow]);

  const handlePageChange = useCallback(
    (type) => {
      if (Math.ceil(data.length / totalShow) >= type + 1) {
        setCurrentPage(type + 1);
        _processData();
      }
    },
    [_processData, setCurrentPage, data]
  );

  const handleSortOrderChange = (row, order) => {
    console.log(`handleSortOrderChange key:${row} order: ${order}`);
  };

  const handleRowSize = (page) => {
    console.log(page);
  };

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
        const tempData = candidates.filter((val) => {
          if (
            val?.candidate?.name?.match(new RegExp(value, "ig")) ||
            val?.candidate?.email?.match(new RegExp(value, "ig"))
          ) {
            return val;
          }
        });
        setData(tempData);
      } else {
        setData(candidates);
      }
    },
    [queryFilter, _processData, data, setData, candidates]
  );

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
    },
    [setSidePanel]
  );

  const handleEdit = useCallback((all) => {
    historyUtils.push(`${RouteName.CANDIDATES_UPDATE}${all.candidate_id}`, {
      isEdit: true,
    });
  }, []);
  const configFilter = useMemo(() => {
    return [
      {
        label: "Location",
        name: "employeesObj.location_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.LOCATIONS,
      },
      {
        label: "Status",
        name: "claimObj.status",
        type: "select",
        fields: [
          "REJECTED",
          "PENDING",
          "APPROVED",
          "PROCESSED",
          "HOD_APPROVED",
          "SITE_HR_APPROVED",
          "CORPORATE_AUDIT_1_APPROVED",
          "CORPORATE_AUDIT_2_APPROVED",
          "ACCOUNTS_APPROVED",
        ],
      },
      {
        label: "Claim Type",
        name: "claimObj.claim_type",
        type: "select",
        fields: [
          "MARRAIGE",
          "CAR",
          "MOBILE",
          "PHC",
          "LOCAL_TRAVEL",
          "RELOCATION",
        ],
      },
    ];
  }, [listData]);

  return {
    handlePageChange,
    // handleCellClick,
    handleFilterDataChange,
    handleSearchValueChange,
    // handlePreviousPageClick,
    // handleNextPageClick,
    handleRowSize,
    handleSortOrderChange,
    isCandidatesFetching,
    currentData,
    data: candidates,
    currentPage,
    handleViewDetails,
    handleEdit,
    configFilter,
    handleSideToggle,
    isSidePanel,
  };
};

export default useNextYearSuccessionPlanner;
