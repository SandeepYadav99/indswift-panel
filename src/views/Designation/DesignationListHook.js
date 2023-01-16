import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    actionCreateDesignation,
    actionDeleteDesignation,
    actionFetchDesignation,
    actionSetPageDesignation,
    actionUpdateDesignation
} from "../../actions/Designation.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";


const useDesignationList = ({}) => {
    const [isSidePanel, setSidePanel] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [editData, setEditData] = useState(null);
    const dispatch = useDispatch();
    const isMountRef = useRef(false);
    const {sorting_data: sortingData, is_fetching: isFetching, query, query_data: queryData} = useSelector(state => state.designation);

    useEffect(() => {
        // dispatch(actionFetchDepartment());
    }, []);

    useEffect(() => {
        dispatch(actionFetchDesignation(1, sortingData, {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,
        }));
        isMountRef.current = true;
    }, []);

    // }
    const handlePageChange = useCallback((type) => {
        console.log('_handlePageChange', type);
        dispatch(actionSetPageDesignation(type));
    }, []);

    const handleDataSave = useCallback((data, type) =>  {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            dispatch(actionCreateDesignation(data));
        } else {
            dispatch(actionUpdateDesignation(data));
        }
        setSidePanel(e => !e);
        setEditData(null);
    }, [setSidePanel, setEditData]);

    const queryFilter = useCallback((key, value) => {
        console.log('_queryFilter', key, value);
        // dispatch(actionSetPageDesignationRequests(1));
        dispatch(actionFetchDesignation(1, sortingData, {
            query: key == 'SEARCH_TEXT' ? value : query,
            query_data: key == 'FILTER_DATA' ? value : queryData,
        }));
        // dispatch(actionFetchDesignation(1, sortingData))
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
        dispatch(actionSetPageDesignation(1));
        dispatch(actionFetchDesignation(1, {row, order}, {
            query: query,
            query_data: queryData,
        }))
    }, [query, queryData]);

    const handleRowSize = (page) => {
        console.log(page);
    }

    const handleDelete = useCallback((id) => {
        dispatch(actionDeleteDesignation(id));
        setSidePanel(false);
        setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleEdit = useCallback((data) => {
        historyUtils.push(RouteName.DESIGNATION_UPDATE+data.id);
    }, [setEditData, setSidePanel]);

    const handleViewDetails = useCallback((data) => {
        historyUtils.push('/designation/detail/') //+data.id
    }, []);

    const handleSubDesignation = useCallback((data) => {
        // historyUtils.push(RouteName.SUB_DESIGNATIONS+data.code) //+
    }, []);

    const handleCreate = useCallback(() => {
        historyUtils.push(RouteName.DESIGNATION_CREATE) //+
    }, []);

    const configFilter = useMemo(() => {
        return [
            {label: 'Created Date', options: { maxDate: new Date() },  name: 'createdAt', type: 'date'},
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
        handleViewDetails,
        isCalling,
        editData,
        isSidePanel,
        configFilter,
        handleSubDesignation,
        handleCreate
    }
};

export default useDesignationList;
