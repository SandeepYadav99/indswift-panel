import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateClaims,
  actionDeleteClaims,
  actionFetchClaims,
  actionSetPageClaims,
  actionUpdateClaims,
} from "../../../actions/Claims.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import {
  serviceExportBankSheetList,
  serviceExportClaimList,
} from "../../../services/Claims.service";
import Constants from "../../../config/constants";
const useClaimsList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [downloadCL, setdownloadCL] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const { role } = useSelector((state) => state.auth);
  const EmpId =
    window.location.pathname === "/cm/hr/claims"
      ? { employee_id: "63d9267d3d18b8ce6e9b700c" }
      : {};
  const [listData, setListData] = useState({
    LOCATIONS: [],
    HR: [],
    JOB_OPENINGS: [],
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.claims);
  useEffect(() => {
    dispatch(
      actionFetchClaims(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        ...EmpId,
      })
    );
    isMountRef.current = true;
  }, []);
  const handleAddCandidate = useCallback(
    (event) => {
      setdownloadCL(event.currentTarget);
    },
    [setdownloadCL]
  );
  const handleClosedownloadCL = useCallback(() => {
    setdownloadCL(null);
  }, [setdownloadCL]);
  const handleCandidateMenu = useCallback(
    (type) => {
      if (type === "ALL") {
        handleCsvDownload("");
        handleClosedownloadCL();
      } else {
        handleCsvDownload(type);
        handleClosedownloadCL();
      }
    },
    [setdownloadCL]
  );
  useEffect(() => {
    serviceGetList(["LOCATIONS", "HR", "JOB_OPENINGS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageClaims(type));
  }, []);
  const handleCsvDownload = useCallback((payload) => {
    serviceExportClaimList({ status: payload }).then((res) => {
      if (!res.error) {
        const data = res.data?.response;
        window.open(data, "_blank");
      }
    });
  }, []);
  const handleBankSheetDownload = useCallback(() => {
    serviceExportBankSheetList({}).then((res) => {
      if (!res.error) {
        const data = res.data?.response;
        window.open(data, "_blank");
      }
    });
  }, []);
  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateClaims(data));
      } else {
        dispatch(actionUpdateClaims(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageClaimsRequests(1));
      dispatch(
        actionFetchClaims(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          ...EmpId,
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
      // dispatch(actionSetPageClaims(1));
      dispatch(
        actionFetchClaims(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            ...EmpId,
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
      dispatch(actionDeleteClaims(id));
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
    historyUtils.push(RouteName.CANDIDATES_CREATE);
    // setSidePanel(e => !e);
    // setEditData(null);
  }, [setEditData, setSidePanel]);
  
  const handleViewDetails = useCallback(
    (data) => {
      LogUtils.log("data", data);
      if (EmpId?.employee_id) {
        if (data?.claim?.claim_type === "TRAVEL") {
          historyUtils.push(`${RouteName.TRAVEL_HR_CLAIMS_DETAILS}${data?.id}`);
        } else if (data?.claim?.claim_type === "FOREIGN_TRAVEL") {
          historyUtils.push(`${RouteName.FOREIGN_HR_CLAIMS_DETAILS}${data?.id}`); //+data.id
        }else {
          historyUtils.push(`${RouteName.CLAIMS_HR_DETAILS}${data?.id}`); //+data.id
        }
      } else {
        if (data?.claim?.claim_type === "TRAVEL") {
          historyUtils.push(`${RouteName.TRAVEL_CLAIMS_DETAILS}${data?.id}`); //+data.id
        } else if (data?.claim?.claim_type === "FOREIGN_TRAVEL") {
          historyUtils.push(`${RouteName.FOREIGN_CLAIMS_DETAILS}${data?.id}`); //+data.id
        } else {
          historyUtils.push(`${RouteName.CLAIMS_DETAILS}${data?.id}`); //+data.id
        }
      }
    },
    [EmpId]
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
          "TRAVEL",
          "FOREIGN_TRAVEL"
        ],
      },
    ];
  }, [listData]);

  const isShowDownloadBtn = useMemo(() => {
    const Roles = Constants.ROLES;
    if (
      [
        Roles.ADMIN,
        Roles.CORPORATE_HR,
        Roles.ACCOUNTANT,
        Roles.CORPORATE_REVIEWER,
      ].indexOf(role) >= 0
    ) {
      return true;
    }
    return false;
  }, [role]);

  return {
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
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCsvDownload,
    handleBankSheetDownload,
    handleAddCandidate,
    downloadCL,
    handleClosedownloadCL,
    handleCandidateMenu,
    isShowDownloadBtn,
  };
};

export default useClaimsList;
