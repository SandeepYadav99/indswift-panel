import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchEmployeeVersion,
  actionSetPageEmployeeVersion,
} from "../../../actions/EmployeeEditVersions.action";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import {serviceGetList} from "../../../services/Common.service";

const useEmployeeVersionList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const [employees, setEmployees] = useState([]);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.employee_versions);
  const status = [
    { id: "APPROVED", name: "APPROVED" },
    { id: "PENDING", name: "PENDING" },
    { id: "REJECTED", name: "REJECTED" },
  ];

    useEffect(() => {
        serviceGetList(['EMPLOYEES']).then((res) => {
            if (!res.error) {
                setEmployees(res?.data?.EMPLOYEES);
            }
        });
    }, [])

  useEffect(() => {
    dispatch(
      actionFetchEmployeeVersion(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  // const handleCellClick = (rowIndex, columnIndex, row, column) => {
  //     console.log(`handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
  // }
  // const handlePreviousPageClick = () => {
  //     console.log('handlePreviousPageClick', 'PREV');
  // }
  //
  // const handleNextPageClick = () => {
  //     console.log('handleNextPageClick', 'NEXT');
  // }

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEmployeeVersion(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );
  const changeEmployeeRoute = useCallback((data) => {
    historyUtils.push(`/employees/details/${data?.code}`);
}, []);
  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEmployeeVersionRequests(1));
      dispatch(
        actionFetchEmployeeVersion(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchEmployeeVersion(1, sortingData))
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
      // dispatch(actionSetPageEmployeeVersion(1));
      dispatch(
        actionFetchEmployeeVersion(
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
      setSidePanel((e) => !e);
      if (data) {
        setEditData(data?.id);
      }
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
      // {label: 'Country', name: 'country', type: 'text'},
      // {label: 'City', name: 'city', type: 'text'},
      {
        label: "Status",
        name: "status",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: status,
      },
      // {
      //   label: "Created Date",
      //   options: { maxDate: new Date() },
      //   name: "createdAt",
      //   type: "date",
      // },
        {label: 'Changed By', name: 'edited_by', type: 'selectObject', custom: { extract: { id: 'id', title: 'name' } } , fields: employees},
    ];
  }, [employees]);

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
    handleCreate,
    changeEmployeeRoute
  };
};

export default useEmployeeVersionList;
