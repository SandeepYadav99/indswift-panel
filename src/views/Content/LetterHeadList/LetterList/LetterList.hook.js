import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchLetterHead,
  actionSetPageLetterHead,
} from "../../../../actions/LetterHead.action";
import historyUtils from "../../../../libs/history.utils";
import LogUtils from "../../../../libs/LogUtils";
import RouteName from "../../../../routes/Route.name";
import { serviceGetList } from "../../../../services/Common.service";
import { serviceExportLetterHead } from "../../../../services/LetterHead.service";

const useLetterHeadHook = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
  } = useSelector((state) => state.letter_head);
  useEffect(() => {
    dispatch(
      actionFetchLetterHead(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const handleToggle = useCallback(
    (data) => {
      data?.id ? setEditData(data) : setEditData(null);
      setIsOpen((s) => !s);
    },
    [isOpen, editData]
  );

  useEffect(() => {
    serviceGetList(["LOCATIONS", "GRADES", "DEPARTMENTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageLetterHead(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      // dispatch(actionSetPageLetterHeadRequests(1));
      dispatch(
        actionFetchLetterHead(1, sortingData, {
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
      // dispatch(actionSetPageLetterHead(1));
      dispatch(
        actionFetchLetterHead(
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
    historyUtils.push(`${RouteName.LETTERHEAD_UPDATE}${data?.id}`); //+data.id
  }, []);

  const handleViewForm = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.TAX_DETAIL}${data?.id}`); //+data.id
  }, []);

  const handleCreate = useCallback(() => {
    historyUtils.push(`${RouteName.LETTERHEAD_CREATE}`); //+data.id
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
    serviceExportLetterHead({}).then((res) => {
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
    handleViewForm,
    handleBankSheetDownload,
    role,
    handleCreate,
    handleToggle,
    isOpen,
  };
};

export default useLetterHeadHook;
