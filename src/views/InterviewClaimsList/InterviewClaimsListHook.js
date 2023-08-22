import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionDeleteInterviewClaims,
  actionFetchInterviewClaims,
  actionSetPageInterviewClaims,
} from "../../actions/InterviewClaims.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";
import { serviceGetList } from "../../services/Common.service";
import Constants from "../../config/constants";
import { serviceExportBankSheetListInterview } from "../../services/InterviewClaims.service";

const useInterviewClaimsList = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const {role} = useSelector(state => state.auth);
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
  } = useSelector((state) => state.interview_claims);
  useEffect(() => {
    dispatch(
      actionFetchInterviewClaims(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  useEffect(() => {
    serviceGetList(["LOCATIONS", "HR", "JOB_OPENINGS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  console.log("list", listData);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageInterviewClaims(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageInterviewClaimsRequests(1));
      dispatch(
        actionFetchInterviewClaims(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
    },
    [sortingData, query, queryData]
  );

  const isShowDownloadBtn = useMemo(() => {
    const Roles = Constants.ROLES;
    if (([ Roles.CORPORATE_HR, Roles.ACCOUNTANT]).indexOf(role) >=0) {
      return true;
    } return false;

  }, [role]);

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
      // dispatch(actionSetPageInterviewClaims(1));
      dispatch(
        actionFetchInterviewClaims(
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

  const handleBankSheetDownload = useCallback(() => {
    serviceExportBankSheetListInterview({}).then((res) => {
      if (!res.error) {
        const data = res.data?.response;
        window.open(data, "_blank");
      }
    });
  }, []);

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.CLAIMS_INTERVIEW_DETAILS}${data?.id}`); //+data.id
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "claimObj.status",
        type: "select",
        fields: [
          "REJECTED",
          "PENDING",
          "APPROVED",
          "PROCESSED",
          "RECRUITER_APPROVED",
          "CORPORATE_AUDIT_2_APPROVED"
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
    handleViewDetails,
    isCalling,
    editData,
    configFilter,
    handleBankSheetDownload,
    isShowDownloadBtn
  };
};

export default useInterviewClaimsList;
