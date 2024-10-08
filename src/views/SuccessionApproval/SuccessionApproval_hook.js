import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchSuccessionA,
  actionSetPageSuccessionA,
} from "../../actions/SuccessionA.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";
import { serviceGetList } from "../../services/Common.service";

const useSuccessionApprovalHook = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    GRADES: [],
    DEPARTMENTS: [],
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.succession_approval);
  useEffect(() => {
    dispatch(
      actionFetchSuccessionA(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  useEffect(() => {
    serviceGetList(["LOCATIONS", "GRADES", "DEPARTMENTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageSuccessionA(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      // dispatch(actionSetPageSuccessionARequests(1));
      dispatch(
        actionFetchSuccessionA(1, sortingData, {
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
      // dispatch(actionSetPageSuccessionA(1));
      dispatch(
        actionFetchSuccessionA(
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
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.SUCCESSION_APPROVAL_DETAIL}${data?.id}`); //+data.id
  }, []);

  const handleViewForm = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.FULL_FINAL_FORM}${data?.id}`); //+data.id
  }, []);
  const configFilter = useMemo(() => {
    return [
      // {label: 'Country', name: 'country', type: 'text'},
      // {label: 'City', name: 'city', type: 'text'},

      {
        label: "Location",
        name: "employeesObj.location_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.LOCATIONS,
      },
      {
        label: "Department",
        name: "employeesObj.department_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.DEPARTMENTS,
      },
      {
        label: "Own Status",
        name: "status",
        type: "select",
        fields: [
          "ACCEPTED",
          "APPROVED",
          "REJECTED",
          "WAITING",
          "PENDING",
          "AUTO_REJECTED",
        ],
      },
      {
        label: "Overall Status",
        name: "application.status",
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
    handleViewForm,
  };
};

export default useSuccessionApprovalHook;
