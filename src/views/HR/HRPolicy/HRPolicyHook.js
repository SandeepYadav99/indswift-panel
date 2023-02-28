import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    actionCreateHRPolicy,
    actionDeleteHRPolicy,
    actionFetchHRPolicy,
    actionSetPageHRPolicy,
    actionUpdateHRPolicy
} from "../../../actions/HRPolicy.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";


const useHRPolicyList = ({}) => {
    const [isSidePanel, setSidePanel] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [editData, setEditData] = useState(null);
    const dispatch = useDispatch();
    const isMountRef = useRef(false);
    const {sorting_data: sortingData, is_fetching: isFetching, query, query_data: queryData} = useSelector(state => state.department);

    useEffect(() => {
        // dispatch(actionFetchHRPolicy());
    }, []);

    useEffect(() => {
        dispatch(actionFetchHRPolicy(1, sortingData, {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,
        }));
        isMountRef.current = true;
    }, []);

    const handlePageChange = useCallback((type) => {
        dispatch(actionSetPageHRPolicy(type));
    }, []);

    const handleDataSave = useCallback((data, type) =>  {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            dispatch(actionCreateHRPolicy(data));
        } else {
            dispatch(actionUpdateHRPolicy(data));
        }
        setSidePanel(e => !e);
        setEditData(null);
    }, [setSidePanel, setEditData]);

    const queryFilter = useCallback((key, value) => {
        // dispatch(actionSetPageHRPolicyRequests(1));
        dispatch(actionFetchHRPolicy(1, sortingData, {
            query: key == 'SEARCH_TEXT' ? value : query,
            query_data: key == 'FILTER_DATA' ? value : queryData,
        }));
        // dispatch(actionFetchHRPolicy(1, sortingData))
    }, [sortingData, query, queryData,]);

    const handleFilterDataChange = useCallback((value) => {
        queryFilter('FILTER_DATA', value);
    }, [queryFilter]);

    const handleSearchValueChange = useCallback((value) => {
        queryFilter('SEARCH_TEXT', value);
    }, [queryFilter]);


    const handleSortOrderChange = useCallback((row, order) => {
        dispatch(actionSetPageHRPolicy(1));
        dispatch(actionFetchHRPolicy(1, {row, order}, {
            query: query,
            query_data: queryData,
        }))
    }, [query, queryData]);

    const handleRowSize = (page) => {
    }

    const handleDelete = useCallback((id) => {
        dispatch(actionDeleteHRPolicy(id));
        setSidePanel(false);
        setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleEdit = useCallback((data) => {
        historyUtils.push(RouteName.HR_POLICIES_UPDATE+data.id);
    }, [setEditData, setSidePanel]);

    const handleViewDetails = useCallback((data) => {
        historyUtils.push('/departments/detail/') //+data.id
    }, []);

    const handleSubDepartment = useCallback((data) => {
        historyUtils.push(RouteName.SUB_DEPARTMENTS+data.code) //+
    }, []);

    const handleCreate = useCallback(() => {
        historyUtils.push(RouteName.HR_POLICIES_CREATE)
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
        isSidePanel,
        configFilter,
        handleSubDepartment,
        handleCreate
    }
};

export default useHRPolicyList;
