import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateClaimList,
  actionDeleteClaimList,
  actionFetchClaimList,
  actionSetPageClaimList,
  actionUpdateClaimList,
} from "../../../../../actions/EmployeeClaimList.action";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";

const useEmployeeClaimList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.emp_claimList);

  useEffect(() => {
    dispatch(
      actionFetchClaimList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageClaimList(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateClaimList(data));
      } else {
        dispatch(actionUpdateClaimList(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageClaimListRequests(1));
      dispatch(
        actionFetchClaimList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchClaimList(1, sortingData))
    },
    [sortingData, query, queryData]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(actionSetPageClaimList(1));
      dispatch(
        actionFetchClaimList(
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
      dispatch(actionDeleteClaimList(id));
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

  const handleSideToggle = useCallback(
    (data) => {
      historyUtils.push(RouteName.LOCATIONS_UPDATE + data?.id);
    },
    [setEditData, setSidePanel]
  );

  const handleViewDetails = useCallback((data) => {
    if (data?.claim?.claim_type === "TRAVEL") {
      historyUtils.push(`${RouteName.TRAVEL_CLAIMS_DETAILS}${data?.id}`); //+data.id
    } else if (data?.claim?.claim_type === "FOREIGN_TRAVEL") {
      historyUtils.push(`${RouteName.FOREIGN_CLAIMS_DETAILS}${data?.id}`); //+data.id
    } else {
      historyUtils.push(`${RouteName.EMPLOYEE_CLAIMS_DETAILS}${data?.id}`); //+data.id
    }
  }, []);

  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.LOCATIONS_CREATE);
  }, []);

  return {
    handlePageChange,
    handleDataSave,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    isCalling,
    editData,
    isSidePanel,
    handleCreate,
  };
};

export default useEmployeeClaimList;
