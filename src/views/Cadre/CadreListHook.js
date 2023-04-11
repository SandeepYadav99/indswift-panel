import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    actionCreateCadre,
    actionDeleteCadre,
    actionFetchCadre,
    actionSetPageCadre,
    actionUpdateCadre
} from "../../actions/Cadre.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";
import {useParams} from "react-router";


const useCadreList = ({}) => {
    const [isSidePanel, setSidePanel] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [editData, setEditData] = useState(null);
    const dispatch = useDispatch();
    const isMountRef = useRef(false);
    const {sorting_data: sortingData, is_fetching: isFetching, query, query_data: queryData} = useSelector(state => state.subdepartment);
    const { code } = useParams();

    useEffect(() => {
        dispatch(actionFetchCadre(1, sortingData, {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,
            code: code
        }));
        isMountRef.current = true;
    }, [code]);

    const handlePageChange = useCallback((type) => {
        console.log('_handlePageChange', type);
        dispatch(actionSetPageCadre(type));
    }, []);

    const handleDataSave = useCallback((data, type) =>  {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            dispatch(actionCreateCadre(data));
        } else {
            dispatch(actionUpdateCadre(data));
        }
        setSidePanel(e => !e);
        setEditData(null);
    }, [setSidePanel, setEditData]);

    const queryFilter = useCallback((key, value) => {
        console.log('_queryFilter', key, value);
        // dispatch(actionSetPageCadreRequests(1));
        dispatch(actionFetchCadre(1, sortingData, {
            query: key == 'SEARCH_TEXT' ? value : query,
            query_data: key == 'FILTER_DATA' ? value : queryData,
        }));
        // dispatch(actionFetchCadre(1, sortingData))
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
        dispatch(actionSetPageCadre(1));
        dispatch(actionFetchCadre(1, {row, order}, {
            query: query,
            query_data: queryData,
        }))
    }, [query, queryData]);

    const handleRowSize = (page) => {
        console.log(page);
    }

    const handleDelete = useCallback((id) => {
        dispatch(actionDeleteCadre(id));
        setSidePanel(false);
        setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleEdit = useCallback((data) => {
        historyUtils.push(RouteName.CADRES_UPDATE+data?.id, { gradeCode: code })
    }, []);

    const handleCreate = useCallback(() => {
        historyUtils.push(RouteName.CADRES_CREATE, { gradeCode: code })
    }, [code]);

    const handleViewDetails = useCallback((data) => {
        LogUtils.log('data', data);
        historyUtils.push(RouteName.CADRES_DETAIL + data?.id) //+data.id
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
        handleCreate,
        handleViewDetails,
        isCalling,
        editData,
        isSidePanel,
        configFilter,
        code
    }
};

export default useCadreList;
