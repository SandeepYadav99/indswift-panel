import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateClaimCarReport,
  actionDeleteClaimCarReport,
  actionFetchClaimCarReport,
  actionSetPageClaimCarReport,
  actionUpdateClaimCarReport,
} from "../../actions/ClaimCarReport.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";
import { serviceGetList } from "../../services/Common.service";
import { serviceExportCarClaimReport } from "../../services/ClaimCarReport.service";
import SnackbarUtils from "../../libs/SnackbarUtils";

const useClaimCarReport = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [year, setYear] = useState("");
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    FY_YEAR: [],
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.claimCarReport);
  useEffect(() => {
    const storedYr = sessionStorage.getItem("car_year");
    if (storedYr) {
      setYear(storedYr);
    }
  }, []);

  useEffect(() => {
    if (year) {
      dispatch(
        actionFetchClaimCarReport(1, sortingData, {
          query: isMountRef.current ? query : null,
          query_data: isMountRef.current ? queryData : null,
          fy_year: year,
          claim_type: "CAR",
        })
      );
      isMountRef.current = true;
    }
  }, [year]);

  useEffect(() => {
    serviceGetList(["LOCATIONS", "FY_YEAR"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  console.log("list", listData);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageClaimCarReport(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateClaimCarReport(data));
      } else {
        dispatch(actionUpdateClaimCarReport(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      if(year){
        console.log("_queryFilter", key, value);
        // dispatch(actionSetPageClaimCarReportRequests(1));
        dispatch(
          actionFetchClaimCarReport(1, sortingData, {
            query: key == "SEARCH_TEXT" ? value : query,
            query_data: key == "FILTER_DATA" ? value : queryData,
            fy_year: year,
            claim_type: "CAR",
          })
        );
      }
    },
    [sortingData, query, queryData, year]
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
      // dispatch(actionSetPageClaimCarReport(1));
      dispatch(
        actionFetchClaimCarReport(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            fy_year: year,
            claim_type: "CAR",
          }
        )
      );
    },
    [query, queryData, year]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteClaimCarReport(id));
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
    if (year) {
      serviceExportCarClaimReport({
        fy_year: year,
        claim_type: "CAR",
      }).then((res) => {
        if (!res.error) {
          const data = res.data?.response;
          window.open(data, "_blank");
        }
      });
    } else {
      SnackbarUtils.error("Please select Finacial Year");
    }
  }, [year,setYear]);

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.CLAIMS_DETAILS}${data?.id}`); //+data.id
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Location",
        name: "location_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.LOCATIONS,
      },
      {
        label: "Claim Category",
        name: "category",
        type: "select",
        fields: ["PART B", "PART E"],
      },
      {
        label: "Financial year",
        name: "fy_year",
        type: "select",
        fields: ["2023-2024"],
      },
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
    year,
    setYear,
    listData
  };
};

export default useClaimCarReport;
