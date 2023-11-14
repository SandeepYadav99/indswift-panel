import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState , useRef} from "react";

import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";
import { actionFetchSuccessionPlaner, actionSetPageSuccessionPlaner } from "../../../../actions/SuccessionPlanner.action";

const totalShow = 10;
const useThisYearSuccessionPlaner = ({ jobId }) => {
  const dispatch = useDispatch();


  const [isSidePanel, setSidePanel] = useState(false);
  const [isSidePanelForm, setSidePanelForm] = useState(false);
 
  const isMountRef = useRef(false);

  const {
    sorting_data: sortingData,
     is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.successionPlaner);

  const [listData, setListData] = useState({
    LOCATIONS: [],
    HR: [],
    JOB_OPENINGS: [],
  });

  useEffect(() => {
    dispatch(
      actionFetchSuccessionPlaner(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  
 

  const handlePageChange = useCallback((type) => {

    dispatch(actionSetPageSuccessionPlaner(type));
  }, []);
  
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
    },
    [queryFilter]
  );

  const _handleDateChange = (date) => {
    // this.setState({
    //     selectedDate: date,
    // });
  };

  const _handleWarehouseChange = (e, data) => {
    console.log("handleWarehouseChange", e.target.value);
    const batchId = e.target.value;
  };

  const handleEdit = useCallback((all) => {
    historyUtils.push(`${RouteName.CANDIDATES_UPDATE}${all.candidate_id}`, {
      isEdit: true,
    });
  }, []);

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      //   setEditData(data?.id);
    },
    [setSidePanel] // setEditData
  );

  const handleToggleSidePannelForm = useCallback(
    (data) => {
      setSidePanelForm((e) => !e);
      //   setEditData(data?.id);
    },
    [setSidePanelForm] // setEditData
  );

  const handlePreviousPageClick = () => {
    console.log("handlePreviousPageClick", "PREV");
  };

  const handleNextPageClick = () => {
    console.log("handleNextPageClick", "NEXT");
  };

  const handleSortOrderChange = (row, order) => {
    console.log(`handleSortOrderChange key:${row} order: ${order}`);
  };

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
   
  
    handleEdit,
    configFilter,
    handleToggleSidePannel,
    isSidePanel,
    isSidePanelForm,
    handleToggleSidePannelForm,
  };
};

export default useThisYearSuccessionPlaner;
