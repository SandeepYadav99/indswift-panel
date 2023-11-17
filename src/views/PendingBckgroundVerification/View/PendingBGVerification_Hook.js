import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  actionFetchPendingBGVList,
  actionSetPagePendingBGVList,
} from "../../../actions/PendingBGVerification.action";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import constants from "../../../config/constants";
import { actionFetchEmployee } from "../../../actions/Employee.action";
import { serviceGetList } from "../../../services/Common.service";
import { serviceBGVDownload } from "../../../services/PendingBGVerification.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";

const usePendingBGVerification_Hook = () => {
  const [isCalling] = useState(false);
  const [editData] = useState(null);
  const { role } = useSelector((state) => state.auth);
  const [listData, setListData] = useState({
    EMPLOYEES: [],
    DEPARTMENTS: [],
    LOCATIONS: [],
    BGV_STATUS:[]
  });

  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    // is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.pendingBGV);

  useEffect(() => {
    dispatch(
      actionFetchPendingBGVList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPagePendingBGVList(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchPendingBGVList(1, sortingData, {
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
      dispatch(
        actionFetchPendingBGVList(
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

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(
      `${RouteName.PENDING_VERIFICATION_CREATE}${data?.id}?emp_code=${data?.emp_code}&offerDate=${data?.offerDate}&offerAcceptedDate=${data?.offerAcceptedDate}`
    );
  }, []);

  const handleBGVUpdateDetails = useCallback((data) => {
    historyUtils.push(
      `${RouteName.PENDING_VERIFICATION_UPDATE}${data?.id}?offerDate=${data?.offerDate}&offerAcceptedDate=${data?.offerAcceptedDate}`
    );
  }, []);

  const handleBGVDetails = useCallback((data) => {
    historyUtils.push(
      `${RouteName.PENDING_VERIFICATION_DETAIL}${data?.id}?offerDate=${data?.offerDate}&offerAcceptedDate=${data?.offerAcceptedDate}`
    );
  }, []);

  const handleBgvAnalysisReport = useCallback((data) => {
    historyUtils.push(`${RouteName.BGV_ANALYSI_REPOST}`);
  }, []);

  const handleBgvReportDownload = useCallback((data) => {
    serviceBGVDownload({
      index: 1,
      order: null,
      query: "",
      query_data: null,
      row: null,
    }).then((res) => {
      if (!res?.error) {
      
        const data = res.data;
        window.open(data, "_blank");
      } else {
        SnackbarUtils.error(res?.message);
      }
    });
  }, []);

  const initData = useCallback(() => {
    dispatch(
      actionFetchEmployee(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
  }, []);

  useEffect(() => {
    initData();
    isMountRef.current = true;
    serviceGetList(["LOCATIONS", "DEPARTMENTS", "BGV_STATUS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const configFilter = useMemo(() => {
    return [
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
        label: "Department",
        name: "department_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.DEPARTMENTS,
      },
      {
        label: "BGV status",
        name: "bgv_status_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.BGV_STATUS,
      },
    ];
  }, [listData]);
console.log(listData)
  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleBGVUpdateDetails,
    isCalling,
    editData,
    configFilter,
    handleViewDetails,
    handleBGVDetails,
    handleBgvAnalysisReport,
    handleBgvReportDownload,
  };
};

export default usePendingBGVerification_Hook;
