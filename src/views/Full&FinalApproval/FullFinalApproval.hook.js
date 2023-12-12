import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionDeleteFinalFormApproval,
  actionFetchFinalFormApproval,
  actionSetPageFinalFormApproval,
} from "../../actions/FinalFormApproval.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";
import { serviceGetList } from "../../services/Common.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import { serviceGetFinalFormExport } from "../../services/FinalFormApproval.service";

const useFullFinalApproval = ({}) => {
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
  } = useSelector((state) => state.final_form_approval);
  useEffect(() => {
    dispatch(
      actionFetchFinalFormApproval(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const handleBankSheetDownload = useCallback(() => {
    serviceGetFinalFormExport({}).then((res) => {
      if (!res.error) {
        const data = res.data?.response;
        window.open(data, "_blank");
      }
    });
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
    dispatch(actionSetPageFinalFormApproval(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      // dispatch(actionSetPageFinalFormApprovalRequests(1));
      dispatch(
        actionFetchFinalFormApproval(1, sortingData, {
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
      // dispatch(actionSetPageFinalFormApproval(1));
      dispatch(
        actionFetchFinalFormApproval(
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
    historyUtils.push(`${RouteName.FULL_FINAL_DETAIL_APPROVAL}${data?.id}`); //+data.id
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
        name: "fullAndFinalObj.status",
        type: "select",
        fields: [
          "CORPORATE_AUDIT_2_APPROVED",
          "TAXATION_APPROVED",
          "CORPORATE_HR_APPROVED",
          "CAO_APPROVED",
          "PROCESSED",
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
    handleBankSheetDownload
  };
};

export default useFullFinalApproval;
