import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    actionCreateJobOpenings, actionDeleteJobOpenings,
    actionFetchJobOpenings,
    actionSetPageJobOpeningsRequests,
    actionUpdateJobOpenings
} from "../../actions/JobOpenings.action";
import historyUtils from "../../libs/history.utils";
import {serviceGetCustomList} from "../../services/Common.service";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";
import {serviceGetList} from "../../services/Common.service";
import constants from "../../config/constants";

const useJobOpeningsList = ({}) => {
    const [isSidePanel, setSidePanel] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isBulkDialog, setIsBulkDialog] = useState(false);
    const [warehouseId, setWareHouseId] = useState('ALL');
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
        query_data: queryData
    } = useSelector(state => state.job_openings);

    useEffect(() => {
        serviceGetList(["LOCATIONS", "GRADES", "DEPARTMENTS"]).then((res) => {
            if (!res.error) {
                setListData(res.data);
            }
        });
    }, []);

    useEffect(() => {
        dispatch(actionFetchJobOpenings(1, sortingData, {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,
            warehouse_id: warehouseId
        }));
        isMountRef.current = true;
    }, [warehouseId]);

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
        console.log('_handlePageChange', type);
        dispatch(actionSetPageJobOpeningsRequests(type));
    }, []);

    const handleDataSave = useCallback((data, type) => {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            dispatch(actionCreateJobOpenings(data));
        } else {
            dispatch(actionUpdateJobOpenings(data));
        }
        setSidePanel(e => !e);
        setEditData(null);
    }, [setSidePanel, setEditData]);

    const queryFilter = useCallback((key, value) => {
        console.log('_queryFilter', key, value);
        // dispatch(actionSetPageJobOpeningsRequests(1));
        dispatch(actionFetchJobOpenings(1, sortingData, {
            query: key == 'SEARCH_TEXT' ? value : query,
            query_data: key == 'FILTER_DATA' ? value : queryData,
            warehouse_id: warehouseId,
        }));
        // dispatch(actionFetchJobOpenings(1, sortingData))
    }, [sortingData, query, queryData, warehouseId]);

    const handleFilterDataChange = useCallback((value) => {
        console.log('_handleFilterDataChange', value);
        queryFilter('FILTER_DATA', value);
    }, [queryFilter]);

    const handleSearchValueChange = useCallback((value) => {
        console.log('_handleSearchValueChange', value);
        queryFilter('SEARCH_TEXT', value);
    }, [queryFilter]);


    const handleSortOrderChange = useCallback((row, order) => {
        console.log(`handleSortOrderChange key:${row} order: ${order}`);
        dispatch(actionSetPageJobOpeningsRequests(1));
        dispatch(actionFetchJobOpenings(1, {row, order}, {
            query: query,
            query_data: queryData,
            warehouse_id: warehouseId
        }))
    }, [query, queryData, warehouseId]);

    const handleRowSize = (page) => {
        console.log(page);
    }


    const handleDelete = useCallback((id) => {
        dispatch(actionDeleteJobOpenings(id));
        setSidePanel(false);
        setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleEdit = useCallback((data) => {
        setEditData(data);
        setSidePanel(e => !e);
    }, [setEditData, setSidePanel]);

    const handleSideToggle = useCallback(() => {
        historyUtils.push('/job/openings/create')
        // setSidePanel(e => !e);
        // setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleViewDetails = useCallback((data) => {
        historyUtils.push(RouteName.JOB_OPENINGS_DETAILS + data.id) //+data.id
    }, []);

    const handleViewEditDetails = useCallback((data) => {
        historyUtils.push(RouteName.JOB_OPENINGS_UPDATE + data.id) //+data.id
    }, []);
    const configFilter = useMemo(() => {
        return [
            {
                label: "Location",
                name: "location_id",
                type: "selectObject",
                custom: {extract: {id: "id", title: "name"}},
                fields: listData?.LOCATIONS,
            },
            {label: 'Status', name: 'status', type: 'select', fields: ['ACTIVE', 'INACTIVE', 'CLOSED']},
            {
                label: "Department",
                name: "department_id",
                type: "selectObject",
                custom: {extract: {id: "id", title: "name"}},
                fields: listData?.DEPARTMENTS,
            },
            {
                label: "Created Date",
                options: {maxDate: new Date()},
                name: "createdAt",
                type: "date",
            },
        ];
    }, [listData]);

    const toggleBulkDialog = useCallback(() => {
        setIsBulkDialog(e => !e);
    }, [setIsBulkDialog]);

    const handleChangeWareHouse = useCallback((wareHouseId) => {
        LogUtils.log('wareHouseId', wareHouseId);
        setWareHouseId(wareHouseId);
    }, [setWareHouseId])

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
        toggleBulkDialog,
        isBulkDialog,
        handleViewEditDetails,
        handleChangeWareHouse,
        warehouseId
    }
};

export default useJobOpeningsList;
