import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchContentList,
  actionSetPageContentList,
} from "../../../actions/ContentList.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import { serviceExportContentList } from "../../../services/ContentList.service";

const useContentList = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const { role } = useSelector((state) => state.auth);
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
  } = useSelector((state) => state.content_list);

  useEffect(() => {
    dispatch(
      actionFetchContentList(1, sortingData, {
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
    dispatch(actionSetPageContentList(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      // dispatch(actionSetPageContentListRequests(1));
      dispatch(
        actionFetchContentList(1, sortingData, {
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
      // dispatch(actionSetPageContentList(1));
      dispatch(
        actionFetchContentList(
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

  const handleLetterHead = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.LETTERHEAD_LIST}`); //+data.id
  }, []);

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.CONTENT_UPDATE}${data?.id}`); //+data.id
  }, []);

  const handleCreate = useCallback(() => {
    historyUtils.push(`${RouteName.CONTENT_CREATE}`); //+data.id
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Department",
        name: "employeesObj.department_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.DEPARTMENTS,
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["PENDING", "APPROVED", "REJECTED"],
      },
    ];
  }, [listData]);

  const handleBankSheetDownload = useCallback(() => {
    serviceExportContentList({}).then((res) => {
      if (!res.error) {
        const data = res.data;
        window.open(data, "_blank");
      }
    });
  }, []);

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
    role,
    handleLetterHead,
    handleCreate
  };
};

export default useContentList;
