import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    actionCreateReviewOLR, actionDeleteReviewOLR,
    actionFetchReviewOLR,
    actionSetPageReviewOLR,
    actionUpdateReviewOLR
} from "../../actions/ReviewOLR.action";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";
import historyUtils from "../../libs/history.utils";


const useReviewOLR = ({}) => {
    const [isSidePanel, setSidePanel] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [editData, setEditData] = useState(null);
    const dispatch = useDispatch();
    const isMountRef = useRef(false);
    const {sorting_data: sortingData, is_fetching: isFetching, query, query_data: queryData} = useSelector(state => state.review_olr);

    useEffect(() => {
        dispatch(actionFetchReviewOLR(1, sortingData, {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,

        }));
        isMountRef.current = true;
    }, []);

    const changeRoute = useCallback((data) => {
        historyUtils.push(RouteName.JOB_OPENINGS_DETAILS+data?.job_details?.id) //+data.id
    }, []);
    const handlePageChange = useCallback((type) => {
        dispatch(actionSetPageReviewOLR(type));
    }, []);

    const handleDataSave = useCallback((data, type) =>  {
        if (type == 'CREATE') {
            dispatch(actionCreateReviewOLR(data));
        } else {
            dispatch(actionUpdateReviewOLR(data));
        }
        setSidePanel(e => !e);
        setEditData(null);
    }, [setSidePanel, setEditData]);

    const queryFilter = useCallback((key, value) => {
        dispatch(actionFetchReviewOLR(1, sortingData, {
            query: key == 'SEARCH_TEXT' ? value : query,
            query_data: key == 'FILTER_DATA' ? value : queryData,
        }));
        // dispatch(actionFetchReviewOLR(1, sortingData))
    }, [sortingData, query, queryData,]);

    const handleFilterDataChange = useCallback((value) => {
        queryFilter('FILTER_DATA', value);
    }, [queryFilter]);

    const handleSearchValueChange = useCallback((value) => {
        queryFilter('SEARCH_TEXT', value);
    }, [queryFilter]);



    const handleSortOrderChange = useCallback((row, order) => {
        dispatch(actionSetPageReviewOLR(1));
        dispatch(actionFetchReviewOLR(1, {row, order}, {
            query: query,
            query_data: queryData,
        }))
    }, [query, queryData]);

    const handleRowSize = (page) => {
        console.log(page);
    }

    const handleDelete = useCallback((id) => {
        dispatch(actionDeleteReviewOLR(id));
        setSidePanel(false);
        setEditData(null);
    }, [setEditData, setSidePanel]);

    const handleEdit = useCallback((data) => {
        setEditData(data);
        setSidePanel(e => !e);
    }, [setEditData, setSidePanel]);

    const handleSideToggle = useCallback(() => {
        historyUtils.push(RouteName.CANDIDATES_CREATE)
    }, [setEditData, setSidePanel]);

    const handleViewDetails = useCallback((data) => {
        LogUtils.log('data', data);
        historyUtils.push(`${RouteName.CANDIDATES_DETAILS}${data.candidate_id}`)
    }, []);
    const configFilter = useMemo(() => {
        return [
            {label: 'Created Date', options: { maxDate: new Date() },  name: 'createdAt', type: 'date'},
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
        handleSideToggle,
        handleViewDetails,
        isCalling,
        editData,
        isSidePanel,
        configFilter,
        changeRoute
    }
};

export default useReviewOLR;
