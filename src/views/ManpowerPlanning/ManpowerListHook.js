import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    actionCreateManpower, actionDeleteManpower,
    actionFetchManpower,
    actionSetPageManpowerRequests,
    actionUpdateManpower
} from "../../actions/Manpower.action";
import historyUtils from "../../libs/history.utils";
import {serviceGetCustomList} from "../../services/Common.service";
import LogUtils from "../../libs/LogUtils";


const useManpowerList = ({}) => {
    const [isSidePanel, setSidePanel] = useState(false);
    const [isInfoPanel, setInfoPanel] = useState(false);
    const [selectedManpowerId, setSelectedManpowerId] = useState(null);
    const [isCalling, setIsCalling] = useState(false);
    const [editData, setEditData] = useState(null);
    const [warehouses, setWarehouses] = useState([]);
    const [selected,setSelected] = useState([]);
    const [allSelected, setAllSelected] = useState(false)
    const [warehouseId, setWareHouseId] = useState('');
    const [type, setType] = useState('');
    const dispatch = useDispatch();
    const isMountRef = useRef(false);

    const {sorting_data: sortingData, is_fetching: isFetching, query, query_data: queryData} = useSelector(state => state.manpower);
    useEffect(() => {

    }, []);

    const resetData = useCallback((sort = {}, updateQuery = {}) => {
        dispatch(actionFetchManpower(1, {sortingData, ...sort}, {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,
            warehouse_id: warehouseId,
            type: type,
            ...updateQuery
        }));
        isMountRef.current = true;
    }, [query, queryData, warehouseId, type, sortingData])

    useEffect(() => {
        if (warehouseId) {
            resetData();
        }
    }, [warehouseId, type]);

    const handlePageChange = useCallback((type) => {
        console.log('_handlePageChange', type);
        dispatch(actionSetPageManpowerRequests(type));
    }, []);

    const handleDataSave = useCallback((data, type) =>  {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            dispatch(actionCreateManpower(data));
        } else {
            dispatch(actionUpdateManpower(data));
        }
        setSidePanel(e => !e);
        setEditData(null);
    }, [setSidePanel, setEditData]);

    const queryFilter = useCallback((key, value) => {
        resetData({}, {query: key == 'SEARCH_TEXT' ? value : query,
            query_data: key == 'FILTER_DATA' ? value : queryData});
    }, [query, queryData, resetData]);

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
        dispatch(actionSetPageManpowerRequests(1));
        resetData({row, order}, {});
    }, [resetData]);

    const handleRowSize = (page) => {
        console.log(page);
    }

    const handleDelete = useCallback((id) => {
        dispatch(actionDeleteManpower(id));
        setSidePanel(false);
        setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleSideInfo = useCallback((data) => {
        setInfoPanel(e => !e);
        setSelectedManpowerId(data?.id);
    }, [setInfoPanel,setSelectedManpowerId]);

    const handleQueryInfo =  useCallback((data) => {
        setInfoPanel(true);
    },[]);

    const handleEdit = useCallback((data) => {
        setEditData(data);
        setSidePanel(e => !e);
    }, [setEditData, setSidePanel]);

    const handleSideToggle = useCallback(() => {
        setSidePanel(e => !e);
        setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleViewDetails = useCallback((data) => {
        LogUtils.log('data', data);
        historyUtils.push('/manpower/detail/'+data.id)
    }, []);

    const configFilter = useMemo(() => {
        return [
            // {label: 'Country', name: 'country', type: 'text'},
            // {label: 'City', name: 'city', type: 'text'},
            // {label: 'Request Date', name: 'createdAt', type: 'date'},
            {label: 'Destination Warehouse', name: 'destination_warehouse_id', type: 'selectObject', custom: { extract: { id: 'id', title: 'name' } } , fields: []},
        ];
    }, []);


    const handleChangeWareHouse = useCallback((wareHouseId) => {
        LogUtils.log('wareHouseId', wareHouseId);
        setWareHouseId(wareHouseId);
        setSelected([])
        setAllSelected(false);
    }, [setWareHouseId, setSelected, setAllSelected])


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
        warehouses,
        handleChangeWareHouse,
        warehouseId,
        selected,
        allSelected,
        setAllSelected,
        type, setType,
        isInfoPanel,
        handleSideInfo,
        selectedManpowerId,
        setSelectedManpowerId,
        handleQueryInfo
    }
};

export default useManpowerList;
