import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    actionCreateJobRoles, actionDeleteJobRoles,
    actionFetchJobRoles,
    actionSetPageJobRolesRequests,
    actionUpdateJobRoles
} from "../../actions/JobRoles.action";
import historyUtils from "../../libs/history.utils";
import {serviceGetCustomList} from "../../services/Common.service";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";

const useJobRolesList = ({}) => {
    const [isSidePanel, setSidePanel] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isBulkDialog, setIsBulkDialog] = useState(false);
    const [warehouseId, setWareHouseId] = useState('ALL');
    const dispatch = useDispatch();
    const isMountRef = useRef(false);
    const {sorting_data: sortingData, is_fetching: isFetching, query, query_data: queryData} = useSelector(state => state.job_roles);

    useEffect(() => {}, []);

    useEffect(() => {
        dispatch(actionFetchJobRoles(1, sortingData, {
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
        dispatch(actionSetPageJobRolesRequests(type));
    }, []);

    const handleDataSave = useCallback((data, type) =>  {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            dispatch(actionCreateJobRoles(data));
        } else {
            dispatch(actionUpdateJobRoles(data));
        }
        setSidePanel(e => !e);
        setEditData(null);
    }, [setSidePanel, setEditData]);

    const queryFilter = useCallback((key, value) => {
        console.log('_queryFilter', key, value);
        // dispatch(actionSetPageJobRolesRequests(1));
        dispatch(actionFetchJobRoles(1, sortingData, {
            query: key == 'SEARCH_TEXT' ? value : query,
            query_data: key == 'FILTER_DATA' ? value : queryData,
            warehouse_id: warehouseId,
        }));
        // dispatch(actionFetchJobRoles(1, sortingData))
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
        dispatch(actionSetPageJobRolesRequests(1));
        dispatch(actionFetchJobRoles(1, {row, order}, {
            query: query,
            query_data: queryData,
            warehouse_id: warehouseId
        }))
    }, [query, queryData, warehouseId]);

    const handleRowSize = (page) => {
        console.log(page);
    }


    const handleDelete = useCallback((id) => {
        dispatch(actionDeleteJobRoles(id));
        setSidePanel(false);
        setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleEditClick = useCallback((data) => {
        historyUtils.push(RouteName.JOB_ROLES_UPDATE+data.id);
    }, []);

    const handleSideToggle = useCallback(() => {
        historyUtils.push(RouteName.JOB_ROLES_CREATE)
        // setSidePanel(e => !e);
        // setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleViewDetails = useCallback((data) => {
        historyUtils.push(RouteName.JOB_ROLES_DETAILS+data.id)
    }, []);

    const configFilter = useMemo(() => {
        return [
            // {label: 'Country', name: 'country', type: 'text'},
            // {label: 'City', name: 'city', type: 'text'},
            {label: 'Created Date', options: { maxDate: new Date() },  name: 'createdAt', type: 'date'},
            // {label: 'Status', name: 'status', type: 'select', fields: ['INACTIVE', 'ACTIVE']},
        ];
    }, []);

    const toggleBulkDialog = useCallback(() => {
        setIsBulkDialog(e => !e);
    }, [setIsBulkDialog]);

    const handleChangeWareHouse = useCallback((wareHouseId) => {
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
        handleEditClick,
        handleSideToggle,
        handleViewDetails,
        isCalling,
        editData,
        isSidePanel,
        configFilter,
        toggleBulkDialog,
        isBulkDialog,
        handleChangeWareHouse,
        warehouseId
    }
};

export default useJobRolesList;
