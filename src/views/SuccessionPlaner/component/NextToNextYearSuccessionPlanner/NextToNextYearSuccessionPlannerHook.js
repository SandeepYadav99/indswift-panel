import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useRef } from "react";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";
import {
  actionFetchAfterSuccessionPlaner,
  actionSetPageAfterSuccessionPlaner,
} from "../../../../actions/AfterNextSuccessionPlanner.action";
import { useEffect } from "react";
import { serviceGetSuccessionPlanerSend } from "../../../../services/SuccessionPlanner.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

const useNextToNextYearSuccessionPlanner = ({ listData }) => {
  const dispatch = useDispatch();
  const [isSidePanel, setSidePanel] = useState(false);
  const [isSidePanelForm, setSidePanelForm] = useState(false);
  const isMountRef = useRef(false);
  const [empId, setEmpId] = useState("");
  const [isSend, setIsSend] = useState(false);
  

  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.next_next_year);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageAfterSuccessionPlaner(type, 2));
  }, []);

  useEffect(() => {
    dispatch(
      actionFetchAfterSuccessionPlaner(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        year: 2,
      })
    );
    isMountRef.current = true;
  }, []);

  const handleRowSize = (page) => {
    console.log(page);
  };

  const queryFilter = useCallback(
    (key, value) => {
      // dispatch(actionSetPageFinalFormRequests(1));
      dispatch(
        actionFetchAfterSuccessionPlaner(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          year: 2,
        })
      );
    },
    [sortingData, query, queryData]
  );

  const handleFilterDataChange = useCallback(
    (value) => {
      console.log("_handleFilterDataChange", value);
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );
  const handleToggleSend = useCallback(
    (data) => {
      setIsSend((e) => !e);
      console.log("Data", data);
      if (data?.id) {
        setEmpId(data?.id);
      } else {
        setEmpId("");
      }
    },
    [setIsSend] // setEditData
  );
  const handleResend = useCallback((data) => {
    // LogUtils.log("resend", data);
    serviceGetSuccessionPlanerSend({
      employee_id: data,
    }).then((res) => {
      if (!res.error) {
        SnackbarUtils?.success("Send Successfully");
        setIsSend(false);
        // window.location.reload();
      }
    });
  }, []);
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
      // dispatch(actionSetPageFinalForm(1));
      dispatch(
        actionFetchAfterSuccessionPlaner(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            year: 2,
          }
        )
      );
    },
    [query, queryData]
  );

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
        label: "Grade",
        name: "employeesObj.grade_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "label" } },
        fields: listData?.GRADES,
      },
      {
        label: "Department",
        name: "employeesObj.department_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.DEPARTMENTS,
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["PENDING", "SUBMITTED"],
      },
    ];
  }, [listData]);
  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleEdit,
    handleToggleSidePannel,
    isSidePanel,
    isSidePanelForm,
    handleToggleSidePannelForm,
    configFilter,
    empId,
    handleToggleSend,
    isSend,
    handleResend,
  };
};

export default useNextToNextYearSuccessionPlanner;
