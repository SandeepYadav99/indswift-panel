import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchTravelAuth,
  actionSetPageTravelAuth,
} from "../../../actions/TravelAuth.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import { serviceTravelAuthRepord } from "../../../services/TravelAuth.service";

const useTravelAuth = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    HR: [],
    JOB_OPENINGS: [],
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.travelAuth);
  useEffect(() => {
    dispatch(
      actionFetchTravelAuth(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);
  const ValidUser = useMemo(() => {
    return user?.user_id === "63d9267d3d18b8ce6e9b7002";
  }, [user]);
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
    dispatch(actionSetPageTravelAuth(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageTravelAuthRequests(1));
      dispatch(
        actionFetchTravelAuth(1, sortingData, {
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
      // dispatch(actionSetPageTravelAuth(1));
      dispatch(
        actionFetchTravelAuth(
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

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
      setSidePanel((e) => !e);
    },
    [setEditData, setSidePanel]
  );

  const handleViewCreate = useCallback(() => {
    historyUtils.push(RouteName.TRAVEL_PLANNER_CREATE);
  }, []);

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.TRAVEL_AUTHEN_DETAILS}${data?.id}`); //+data.id
  }, []);

  const handleViewSpecDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.TRAVEL_AUTHEN_SPEC}`); //+data.id
  }, []);
  
  const handleCsvDownload = useCallback(() => {
    serviceTravelAuthRepord().then(res => {
      if (!res.error) {
        const data = res.data?.response;
        window.open(data, "_blank");
      }
    })
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "plannerObj.status",
        type: "select",
        fields: [
          "PENDING",
          "REJECTED",
          "HOD_APPROVED",
          "EXCEPTION_APPROVED",
          "SITE_HR_APPROVED",
          "CORPORATE_HR_APPROVED",
          "ADMIN_AUTHORIZED",
          "BOOKING_DONE",
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
    handleViewCreate,
    isCalling,
    configFilter,
    handleEdit,
    handleCsvDownload,
    handleViewSpecDetails,
    ValidUser
  };
};

export default useTravelAuth;
