import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    actionCreateLocation, actionDeleteLocation,
    actionFetchLocation,
    actionSetPageLocation,
    actionUpdateLocation
} from "../../actions/Location.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";


const useLocationList = ({}) => {
    const [isSidePanel, setSidePanel] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [editData, setEditData] = useState(null);
    const dispatch = useDispatch();
    const isMountRef = useRef(false);
    const {sorting_data: sortingData, is_fetching: isFetching, query, query_data: queryData} = useSelector(state => state.location);

    useEffect(() => {
        // dispatch(actionFetchLocation());
    }, []);

    useEffect(() => {
        dispatch(actionFetchLocation(1, sortingData, {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,

        }));
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
        console.log('_handlePageChange', type);
        dispatch(actionSetPageLocation(type));
    }, []);

    const handleDataSave = useCallback((data, type) =>  {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            dispatch(actionCreateLocation(data));
        } else {
            dispatch(actionUpdateLocation(data));
        }
        setSidePanel(e => !e);
        setEditData(null);
    }, [setSidePanel, setEditData]);

    const queryFilter = useCallback((key, value) => {
        console.log('_queryFilter', key, value);
        // dispatch(actionSetPageLocationRequests(1));
        dispatch(actionFetchLocation(1, sortingData, {
            query: key == 'SEARCH_TEXT' ? value : query,
            query_data: key == 'FILTER_DATA' ? value : queryData,
        }));
        // dispatch(actionFetchLocation(1, sortingData))
    }, [sortingData, query, queryData,]);

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
        dispatch(actionSetPageLocation(1));
        dispatch(actionFetchLocation(1, {row, order}, {
            query: query,
            query_data: queryData,
        }))
    }, [query, queryData]);

    const handleRowSize = (page) => {
        console.log(page);
    }

    const handleDelete = useCallback((id) => {
        dispatch(actionDeleteLocation(id));
        setSidePanel(false);
        setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleEdit = useCallback((data) => {
        setEditData(data);
        setSidePanel(e => !e);
    }, [setEditData, setSidePanel]);

    const handleSideToggle = useCallback(() => {
        historyUtils.push('/location/create')
        // setSidePanel(e => !e);
        // setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleViewDetails = useCallback((data) => {
        LogUtils.log('data', data);
        historyUtils.push('/location/detail/') //+data.id
    }, []);

    const configFilter = useMemo(() => {
        return [
            // {label: 'Country', name: 'country', type: 'text'},
            // {label: 'City', name: 'city', type: 'text'},
            {label: 'Created Date', options: { maxDate: new Date() },  name: 'createdAt', type: 'date'},
            // {label: 'Status', name: 'status', type: 'select', fields: ['INACTIVE', 'ACTIVE']},
        ];
    }, []);


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
    }
};

export default useLocationList;
