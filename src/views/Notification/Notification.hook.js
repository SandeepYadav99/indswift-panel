import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchNotification,
  actionSetPageNotification,
} from "../../actions/Notification.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";
import Constants from "../../config/constants";
import RolesUtils from "../../libs/Roles.utils";

const useNotificationList = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const { role } = useSelector((state) => state.auth);

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
  } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(actionFetchNotification(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null
    }));
    isMountRef.current = true;
  }, []);


  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageNotification(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      dispatch(actionFetchNotification(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        }));
    },
    [sortingData, query, queryData]
  );

  const isShowDownloadBtn = useMemo(() => {
    const Roles = Constants.ROLES;
    return RolesUtils.canAccess([Roles.CORPORATE_HR, Roles.ACCOUNTANT], role);
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
      dispatch(actionFetchNotification(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
          }
        ));
    },
    [query, queryData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.LEAVE_APPLICATION_FORM}`);
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: [
          "PENDING",
          "REJECTED",
          "HOD_APPROVED",
          "SITE_HR_APPROVED",
          "APPROVED",
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
    isShowDownloadBtn,
  };
};

export default useNotificationList;
