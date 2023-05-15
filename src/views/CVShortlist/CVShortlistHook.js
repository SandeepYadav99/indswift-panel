import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchCVShortlist,
  actionSetPageCVShortlist,
  actionUpdateCVShortlist,
} from "../../actions/CVShortlist.action";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import {useParams} from "react-router";
import LogUtils from "../../libs/LogUtils";

const useCVShortlist = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isRejectPopUp,setIsRejectPopUp]=useState(false)
  const [dataValue,setDataValue]=useState({})
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const { id } = useParams();
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.cvShortlist);

  useEffect(() => {
    dispatch(
      actionFetchCVShortlist(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        job_id: id
      })
    );
    isMountRef.current = true;
  }, [id]);

  const toggleRejectDialog = useCallback((obj) => {
    setIsRejectPopUp((e) => !e);
    setDataValue({...obj})

  }, [isRejectPopUp,setDataValue]);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageCVShortlist(type));
  }, []);


  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageCVShortlistRequests(1));
      dispatch(
        actionFetchCVShortlist(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
            job_id: id
        })
      );
      // dispatch(actionFetchCVShortlist(1, sortingData))
    },
    [sortingData, query, queryData, id]
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
      dispatch(actionSetPageCVShortlist(1));
      dispatch(
        actionFetchCVShortlist(
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

  const handleSideToggle = useCallback(
    (data) => {
      historyUtils.push(RouteName.LOCATIONS_UPDATE + data?.id);
    },
    [setEditData, setSidePanel]
  );

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(RouteName.LOCATIONS_DETAILS + data.id); //+data.id
  }, []);

  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.LOCATIONS_CREATE);
  }, []);

  const configFilter = useMemo(() => {
    return [
      // {
      //   label: "Created Date",
      //   options: { maxDate: new Date() },
      //   name: "createdAt",
      //   type: "date",
      // },
    ];
  }, []);
  const candidatePage = useCallback(
    (data) => {
      console.log(data)
      historyUtils.push(`${RouteName.CANDIDATES_DETAILS}${data?.id}`);
    },[]);
  const handleUpdate =  useCallback((data, type) => {
      // LogUtils.log('data', data, type);
      dispatch(actionUpdateCVShortlist(data?.id, type));
  }, []);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,
    isRejectPopUp,
    toggleRejectDialog,
      handleUpdate,
      candidatePage,
      dataValue
  };
};

export default useCVShortlist;
