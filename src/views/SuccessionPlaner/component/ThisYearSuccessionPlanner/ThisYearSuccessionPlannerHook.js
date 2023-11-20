import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useRef } from "react";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";
import {
  actionFetchSuccessionPlaner,
  actionSetPageSuccessionPlaner,
} from "../../../../actions/SuccessionPlanner.action";
import { serviceGetList } from "../../../../services/Common.service";
import { useEffect } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { serviceGetSuccessionPlanerSend } from "../../../../services/SuccessionPlanner.service";
import LogUtils from "../../../../libs/LogUtils";

const useThisYearSuccessionPlaner = ({ jobId, listData }) => {
  const dispatch = useDispatch();
  const [isSidePanel, setSidePanel] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [isSidePanelForm, setSidePanelForm] = useState(false);
  const isMountRef = useRef(false);
  const [empId, setEmpId] = useState("");
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.successionPlaner);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageSuccessionPlaner(type));
  }, []);

  const handleRowSize = (page) => {
    console.log(page);
  };

  const queryFilter = useCallback(
    (key, value) => {
      // dispatch(actionSetPageFinalFormRequests(1));
      dispatch(
        actionFetchSuccessionPlaner(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
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
        actionFetchSuccessionPlaner(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
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
      if (data?.id) {
        setEmpId(data?.id);
      } else {
        setEmpId("");
      }
    },
    [setSidePanel] // setEditData
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
        label: "Succession status",
        name: "saj_status",
        type: "select",
        fields: [
          "NOT_IN_PLACE",
          "REPLACEMENT_EXTERNAL",
          "PLACED",
          "REPLACEMENT_INTERNAL",
          "REJECTED",
          "PENDING",
        ],
      },
      {
        label: "Entension Status",
        name: "extension_status",
        type: "select",
        fields: ["RETIRE", "EXTENSION", "RETENTION", "PENDING"],
      },
      {
        label: "Application status",
        name: "status",
        type: "select",
        fields: [
          "PENDING",
          "EMPLOYEE_PENDING",
          "EXPIRED",
          "EMPLOYEE_SUBMITTED",
          "EMPLOYEE_REJECTED",
          "HOD_REJECTED",
          "HOD_APPROVED",
          "CEO_APPROVED",
          "CEO_REJECTED",
          "CORPORATE_SUBMITTED",
          "MD_APPROVED",
          "MD_REJECTED",
        ],
      },
    ];
  }, [listData]);

  const handleResend = useCallback((data) => {
    LogUtils.log("resend", data);
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

export default useThisYearSuccessionPlaner;
