import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { actionLeaveList } from "../../actions/LeaveModule.action";
import { useDispatch, useSelector } from "react-redux";
import { useRef,useEffect } from "react";
import { actionCreateEmployee, actionDeleteEmployee, actionFetchEmployee, actionSetPageEmployeeRequests, actionUpdateEmployee } from "../../actions/Employee.action";
import {actionLeavesListData} from '../../actions/LeaveModule.action.js';
import { serviceGetList } from "../../services/Common.service";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import { useMemo } from "react";
import constants from "../../config/constants";
import { serviceExportEmployees } from "../../services/Employee.service";

function usePendingLeaveApplication() {
  const dispatch = useDispatch();
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);

  const [ischangeDialog, setIschangeDialog] = useState(false);
  const history = useHistory();
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isCsvDialog, setIsCsvDialog] = useState(false);
  const [isCPCDialog, setIsCPCDialog] = useState(false);
  const [isExtendDialog, setIsExtendDialog] = useState(false);
  const [isTraineeDialog, setIsTraineeDialog] = useState(false);
  const [createDD, setCreateDD] = useState(null);
  const { role } = useSelector((state) => state.auth);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    GRADES: [],
    DEPARTMENTS: [],
    JOINING_CANDIDATES: [],
    TRAINEE_EMPLOYEES: [],
  });
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.employee);

  let LeaveParameters ={
    "index": 1,
    "row": "createdAt",
    "order": "desc",
    "query": "",
    "query_data": null
  }

  const initData = useCallback(() => {
    dispatch(
      actionFetchEmployee(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    dispatch(actionLeavesListData(LeaveParameters))
  }, []);

  const toggleExtendDialog = useCallback(() => {
    setIsExtendDialog((e) => !e);
    setCreateDD(false);
  }, [isExtendDialog]);

  const toggleTraineeDialog = useCallback(() => {
    setIsTraineeDialog((e) => !e);
    setCreateDD(false);
  }, [isTraineeDialog]);

  useEffect(() => {
    initData();
    isMountRef.current = true;
    serviceGetList([
      "LOCATIONS",
      "GRADES",
      "DEPARTMENTS",
      "JOINING_CANDIDATES",
      "TRAINEE_EMPLOYEES",
    ]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

 
  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageEmployeeRequests(type));
  }, []);
  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.EMPLOYEE_CREATE); //+
  }, []);
  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEmployee(data));
      } else {
        dispatch(actionUpdateEmployee(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEmployeeRequests(1));
      dispatch(
        actionFetchEmployee(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchEmployee(1, sortingData))
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
      dispatch(actionSetPageEmployeeRequests(1));
      dispatch(
        actionFetchEmployee(
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

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteEmployee(id));
      setSidePanel(false);
      setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
      setSidePanel((e) => !e);
    },
    [setEditData, setSidePanel]
  );

  const handleSideToggle = useCallback(() => {
    historyUtils.push(RouteName.EMPLOYEE_CREATE);
    // setSidePanel(e => !e);
    // setEditData(null);
  }, [setEditData, setSidePanel]);

  const handleAddCandidate = useCallback(
    (event) => {
      setCreateDD(event.currentTarget);
    },
    [setCreateDD]
  );
  const handleClosedownloadCL = useCallback(() => {
    setCreateDD(null);
  }, [setCreateDD]);

  const handleCandidateMenu = useCallback(
    (type) => {
      if (type === "NEW") {
        historyUtils.push(RouteName.EMPLOYEE_CREATE);
      }
      handleClosedownloadCL();
    },
    [setCreateDD]
  );
  const handleViewDetails = useCallback((data) => {
    historyUtils.push(`/employees/details/${data.emp_code}`);
  }, []);
  const handleViewUpdate = useCallback((data) => {
    historyUtils.push(`${RouteName.EMPLOYEE_UPDATE}${data?.id}`);
  }, []);

const detailPageRoute =(all)=>{
  history.push(all?.employee_id)
}
  

  const configFilter = useMemo(() => {
    return [
      // {label: 'Country', name: 'country', type: 'text'},
      // {label: 'City', name: 'city', type: 'text'},
      ...(role === constants.ROLES.CORPORATE_HR
        ? [
            {
              label: "Location",
              name: "location_id",
              type: "selectObject",
              custom: { extract: { id: "id", title: "name" } },
              fields: listData?.LOCATIONS,
            },
          ]
        : []),
      {
        label: "Grade",
        name: "grade_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "label" } },
        fields: listData?.GRADES,
      },
      {
        label: "Department",
        name: "department_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.DEPARTMENTS,
      },
      {
        label: "Created Date",
        options: { maxDate: new Date() },
        name: "createdAt",
        type: "date",
      },
      // {label: 'Status', name: 'status', type: 'select', fields: ['INACTIVE', 'ACTIVE']},
    ];
  }, [listData, role]);

  const toggleCsvDialog = useCallback(() => {
    setIsCsvDialog((e) => !e);
  }, [setIsCsvDialog]);

  const toggleCPCDialog = useCallback(() => {
    setIsCPCDialog((e) => !e);
  }, [setIsCPCDialog]);

  const handleCsvUpload = useCallback(() => {
    initData();
  }, []);

  const handleCPCUpload = useCallback(() => {}, []);
  const handleCsvDownload = useCallback(() => {
    serviceExportEmployees({
      query: query,
      query_data: queryData,
    }).then((res) => {
      if (!res.error) {
        const data = res.data?.response;
        window.open(data, "_blank");
      }
    });
  }, [query, queryData]);

  let params = {
    index: 1,
    row: "createdAt",
    order: "desc",
    query: "",
    query_data: null,
  };

  useEffect(() => [dispatch(actionLeaveList(params))], []);

  const handleLeaveApplicationForm = () => {
    history.push("form");
    window.location.reload();
  };

  const { id } = useParams();

  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);
  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);
  const toggleChangeDialog = useCallback(() => {
    setIschangeDialog((e) => !e);
  }, [ischangeDialog]);

  return {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleChangeDialog,
    ischangeDialog,
    toggleRejectDialog,
    rejectDialog,
    handleLeaveApplicationForm,
    handlePageChange,
    // handleCellClick,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    // handlePreviousPageClick,
    // handleNextPageClick,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    handleViewUpdate,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    toggleCsvDialog,
    isCsvDialog,
    handleCsvUpload,
    handleCreate,
    isCPCDialog,
    toggleCPCDialog,
    handleCPCUpload,
    handleCsvDownload,
    handleAddCandidate,
    createDD,
    handleClosedownloadCL,
    handleCandidateMenu,
    isExtendDialog,
    toggleExtendDialog,
    isTraineeDialog,
    toggleTraineeDialog,
    listData,
    detailPageRoute,
  };
}

export default usePendingLeaveApplication;
