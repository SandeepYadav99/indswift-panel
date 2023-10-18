import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateImprestApproval,
  actionDeleteImprestApproval,
  actionFetchImprestApproval,
  actionSetPageImprestApproval,
  actionUpdateImprestApproval,
} from "../../../actions/ImprestApproval.action";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
// import { serviceExportCarClaimReport } from "../../../services/ImprestApproval.service";
import LogUtils from "../../../libs/LogUtils";
import { serviceExportImprestApprovalReport } from "../../../services/ImprestApproval.service";

const useImprestApproval = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {role} = useSelector(state => state.auth);

  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.imprestApproval);
  useEffect(() => {
    dispatch(
      actionFetchImprestApproval(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  console.log("list", listData);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageImprestApproval(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateImprestApproval(data));
      } else {
        dispatch(actionUpdateImprestApproval(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageImprestApprovalRequests(1));
      dispatch(
        actionFetchImprestApproval(1, sortingData, {
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
      // dispatch(actionSetPageImprestApproval(1));
      dispatch(
        actionFetchImprestApproval(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            fy_year: "2023-2024",
            claim_type: "CAR",
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
      dispatch(actionDeleteImprestApproval(id));
      setEditData(null);
    },
    [setEditData]
  );

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
    },
    [setEditData]
  );

  const handleCsvDownload = useCallback(() => {
    serviceExportImprestApprovalReport().then(res => {
      if (!res.error) {
        const data = res.data?.response;
        window.open(data, "_blank");
      }
    })
  }, []);

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.IMPREST_APPROVAL_DETAILS}${data?.id}`); //+data.id
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Location",
        name: "employeesObj.location_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.LOCATIONS,
      },
      // {
      //   label: "Claim Category",
      //   name: "category",
      //   type: "select",
      //   fields: ["PART B", "PART E"],
      // },
      // {
      //   label: "Financial year",
      //   name: "fy_year",
      //   type: "select",
      //   fields: ["2023-2024"],
      // },
    ];
  }, [listData]);

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleViewDetails,
    isCalling,
    editData,
    configFilter,
    handleCsvDownload,
    role
  };
};

export default useImprestApproval;
