import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateCandidate,
  actionDeleteCandidate,
  actionFetchCandidate,
  actionSetPageCandidate,
  actionUpdateCandidate,
} from "../../../actions/Candidate.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";

const useCandidateList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
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
  } = useSelector((state) => state.candidate);
  const status = [
    { id: "ACTIVE", name: "ACTIVE" },
    { id: "INACTIVE", name: "INACTIVE" },
    { id: "SHORTLISTED", name: "SHORTLISTED" },
    { id: "INTERVIEW_ALIGNED", name: "INTERVIEW ALIGNED" },
    { id: "CV_SHORTLIST_REJECTED", name: "CV SHORTLIST REJECTED" },
    { id: "PENDING_SHORTLIST", name: "PENDING SHORTLIST" },
    { id: "SELECTED", name: "SELECTED" },
    { id: "PENDING", name: "PENDING" },
    { id: "CV_SHORTLISTED", name: "CV SHORTLISTED" },
    { id: "PENDING_REVIEW", name: "PENDING REVIEW" },
    { id: "INTERVIEW_REJECTED", name: "INTERVIEW REJECTED" },
    { id: "JOINING", name: "JOINING" },
    { id: "DROPPED", name: "DROPPED" },
    { id: "ON_HOLD", name: "ON_HOLD" },
    { id: "OFFER_LETTER", name: "OFFER LETTER" },
  ];

  useEffect(() => {
    dispatch(
      actionFetchCandidate(1, sortingData, {
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
    dispatch(actionSetPageCandidate(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateCandidate(data));
      } else {
        dispatch(actionUpdateCandidate(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageCandidateRequests(1));
      dispatch(
        actionFetchCandidate(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchCandidate(1, sortingData))
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
      dispatch(actionSetPageCandidate(1));
      dispatch(
        actionFetchCandidate(
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
      dispatch(actionDeleteCandidate(id));
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

  const handleSideToggle = useCallback(() => {
    historyUtils.push(RouteName.CANDIDATES_CREATE);
    // setSidePanel(e => !e);
    // setEditData(null);
  }, [setEditData, setSidePanel]);

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.CANDIDATES_DETAILS}${data.id}`); //+data.id
  }, []);

  const configFilter = useMemo(() => {
    return [
    //   {
    //     label: "Created Date",
    //     options: { maxDate: new Date() },
    //     name: "createdAt",
    //     type: "date",
    //   },
      {
        label: "Location",
        name: "job.location._id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.LOCATIONS,
      },
      {
        label: "Coordinator",
        name: "job.assignedPerson._id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.HR,
      },
      {
        label: "PRC",
        name: "job._id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "code" } },
        fields: listData?.JOB_OPENINGS,
      },
      {
        label: "Status",
        name: "status",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: status,
      },
    ];
  }, [listData]);

  return {
    handlePageChange,
    // handleCellClick,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    // handlePreviousPageClick,
    // handleNextPageClick,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
  };
};

export default useCandidateList;
